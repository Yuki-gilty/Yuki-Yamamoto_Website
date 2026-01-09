import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const IMAGES_DIR = './public/images';
const SPONSORS_DIR = './public/images/sponsors';

async function compressImage(inputPath, outputPath) {
  try {
    const stats = await stat(inputPath);
    const originalSize = stats.size;
    
    const ext = inputPath.toLowerCase().split('.').pop();
    let sharpInstance = sharp(inputPath);
    
    // 画像のメタデータを取得
    const metadata = await sharpInstance.metadata();
    const width = metadata.width;
    const height = metadata.height;
    
    // 大きな画像は適切なサイズにリサイズ（最大幅2000px、最大高さ2000px）
    const maxDimension = 2000;
    if (width > maxDimension || height > maxDimension) {
      if (width > height) {
        sharpInstance = sharpInstance.resize(maxDimension, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });
      } else {
        sharpInstance = sharpInstance.resize(null, maxDimension, {
          withoutEnlargement: true,
          fit: 'inside'
        });
      }
    }
    
    // ファイル形式に応じて最適化
    if (ext === 'jpg' || ext === 'jpeg') {
      await sharpInstance
        .jpeg({ 
          quality: 85, 
          progressive: true,
          mozjpeg: true 
        })
        .toFile(outputPath);
    } else if (ext === 'png') {
      await sharpInstance
        .png({ 
          quality: 90,
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toFile(outputPath);
    } else if (ext === 'webp') {
      await sharpInstance
        .webp({ 
          quality: 85,
          effort: 6
        })
        .toFile(outputPath);
    } else {
      // その他の形式はそのままコピー
      await sharpInstance.toFile(outputPath);
    }
    
    const newStats = await stat(outputPath);
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✓ ${inputPath}: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${reduction}% reduction)`);
    
    return { originalSize, newSize, reduction };
  } catch (error) {
    console.error(`✗ Error compressing ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dirPath) {
  try {
    const files = await readdir(dirPath);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    
    let totalOriginalSize = 0;
    let totalNewSize = 0;
    
    for (const file of files) {
      const filePath = join(dirPath, file);
      const stats = await stat(filePath);
      
      if (stats.isDirectory()) {
        // サブディレクトリも処理
        const subDirResults = await processDirectory(filePath);
        totalOriginalSize += subDirResults.originalSize;
        totalNewSize += subDirResults.newSize;
        continue;
      }
      
      const ext = file.toLowerCase().substring(file.lastIndexOf('.'));
      if (!imageExtensions.includes(ext)) {
        continue;
      }
      
      // 一時ファイル名で圧縮
      const tempPath = filePath + '.tmp';
      const result = await compressImage(filePath, tempPath);
      
      if (result) {
        totalOriginalSize += result.originalSize;
        
        // サイズが増加した場合は元のファイルを保持
        if (result.newSize < result.originalSize) {
          totalNewSize += result.newSize;
          
          // 元のファイルを削除して、圧縮されたファイルをリネーム
          const { unlink, rename } = await import('fs/promises');
          await unlink(filePath);
          await rename(tempPath, filePath);
        } else {
          // サイズが増加した場合は元のファイルを保持し、一時ファイルを削除
          totalNewSize += result.originalSize;
          const { unlink } = await import('fs/promises');
          await unlink(tempPath);
          console.log(`  → Skipped (size would increase): ${filePath}`);
        }
      } else if (existsSync(tempPath)) {
        // エラー時は一時ファイルを削除
        const { unlink } = await import('fs/promises');
        await unlink(tempPath);
      }
    }
    
    return { originalSize: totalOriginalSize, newSize: totalNewSize };
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
    return { originalSize: 0, newSize: 0 };
  }
}

async function main() {
  console.log('Starting image compression...\n');
  
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  
  // メイン画像ディレクトリを処理
  if (existsSync(IMAGES_DIR)) {
    console.log(`Processing ${IMAGES_DIR}...`);
    const results = await processDirectory(IMAGES_DIR);
    totalOriginalSize += results.originalSize;
    totalNewSize += results.newSize;
  }
  
  // スポンサー画像ディレクトリを処理
  if (existsSync(SPONSORS_DIR)) {
    console.log(`\nProcessing ${SPONSORS_DIR}...`);
    const results = await processDirectory(SPONSORS_DIR);
    totalOriginalSize += results.originalSize;
    totalNewSize += results.newSize;
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('Compression Summary:');
  console.log(`Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total compressed size: ${(totalNewSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total reduction: ${((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1)}%`);
  console.log(`Space saved: ${((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2)}MB`);
  console.log('='.repeat(50));
}

main().catch(console.error);

