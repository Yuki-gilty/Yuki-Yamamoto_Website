import { exec } from 'child_process';
import { promisify } from 'util';
import { stat, readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const execAsync = promisify(exec);
const VIDEOS_DIR = './public/videos';

async function compressVideo(inputPath, outputPath) {
  try {
    const stats = await stat(inputPath);
    const originalSize = stats.size;
    
    // 動画の情報を取得
    const { stdout: info } = await execAsync(
      `ffmpeg -i "${inputPath}" 2>&1 | grep -E "(Duration|Stream)"`
    );
    
    // 動画を圧縮（H.264コーデック、CRF 28で高品質圧縮、最大解像度1080p）
    // 背景動画なので、さらに低ビットレートで圧縮可能
    const command = `ffmpeg -i "${inputPath}" ` +
      `-c:v libx264 ` +  // H.264コーデック
      `-preset slow ` +  // 高品質エンコード
      `-crf 28 ` +  // 品質設定（23-28が推奨、大きいほど圧縮率が高い）
      `-vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" ` +  // 最大1920x1080にリサイズ
      `-c:a aac ` +  // オーディオコーデック
      `-b:a 64k ` +  // オーディオビットレート（背景動画なので低め）
      `-movflags +faststart ` +  // Web用に最適化
      `-y ` +  // 上書き許可
      `"${outputPath}"`;
    
    await execAsync(command);
    
    const newStats = await stat(outputPath);
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✓ ${inputPath}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${reduction}% reduction)`);
    
    return { originalSize, newSize, reduction };
  } catch (error) {
    console.error(`✗ Error compressing ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dirPath) {
  try {
    const files = await readdir(dirPath);
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
    
    let totalOriginalSize = 0;
    let totalNewSize = 0;
    
    for (const file of files) {
      // .DS_Storeや.gitkeepをスキップ
      if (file.startsWith('.')) {
        continue;
      }
      
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
      if (!videoExtensions.includes(ext)) {
        continue;
      }
      
      // 一時ファイル名で圧縮（拡張子を保持）
      const tempPath = filePath.replace(ext, '.tmp' + ext);
      const result = await compressVideo(filePath, tempPath);
      
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

async function checkFFmpeg() {
  try {
    await execAsync('ffmpeg -version');
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  console.log('Checking for ffmpeg...\n');
  
  const hasFFmpeg = await checkFFmpeg();
  if (!hasFFmpeg) {
    console.error('❌ ffmpeg is not installed!');
    console.error('\nPlease install ffmpeg first:');
    console.error('  macOS: brew install ffmpeg');
    console.error('  Linux: sudo apt-get install ffmpeg (or your package manager)');
    console.error('  Windows: Download from https://ffmpeg.org/download.html');
    process.exit(1);
  }
  
  console.log('✓ ffmpeg found\n');
  console.log('Starting video compression...\n');
  
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  
  // 動画ディレクトリを処理
  if (existsSync(VIDEOS_DIR)) {
    console.log(`Processing ${VIDEOS_DIR}...`);
    const results = await processDirectory(VIDEOS_DIR);
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

