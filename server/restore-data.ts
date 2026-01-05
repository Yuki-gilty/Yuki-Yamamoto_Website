import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    title_ja TEXT NOT NULL,
    title_en TEXT NOT NULL,
    content_ja TEXT NOT NULL,
    content_en TEXT NOT NULL,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year TEXT NOT NULL,
    text_ja TEXT NOT NULL,
    text_en TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Create default admin user if it doesn't exist
const adminExists = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!adminExists) {
  const defaultPassword = 'admin123';
  const passwordHash = bcrypt.hashSync(defaultPassword, 10);
  db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run('admin', passwordHash);
  console.log('Default admin user created: username=admin, password=admin123');
}

// News data
const newsData = [
  {
    date: '2025-08-22',
    title_ja: 'ドローンショー・ジャパン様にスポンサーとしてサポートしていただけることとなりました！',
    title_en: 'Drone Show Japan to Sponsor Our Activities!',
    content_ja: `この度、ドローンショー・ジャパン様にスポンサーしていただけることになりました！！

プレスリリースはこちら↓
https://prtimes.jp/main/html/rd/p/000000126.000080729.html

代表の山本雄貴さん（僕と読みが同じ"やまもと ゆうき"）とのご縁から始まり、こうして応援いただけること、本当に光栄です！

2025年8月から1年間、機体や部品、海外のレースの遠征費などサポートしていただけることになり、これから挑戦する舞台に向けて大きな力をいただきました。

より一層結果を出し、世界中の人にドローンの魅力を届けられるよう頑張っていきます。

引き続き応援よろしくお願いします！`,
    content_en: `We are pleased to announce that Drone Show Japan will be sponsoring our activities!

Press release here↓
https://prtimes.jp/main/html/rd/p/000000126.000080729.html

It all started with a connection to President Yuki Yamamoto (pronounced the same as my name "Yuki Yamamoto"), and I am truly honored to receive this support!

Starting from August 2025 for one year, they will support us with drones, parts, and expenses for international races, giving us great strength for the challenges ahead.

I will work even harder to achieve results and share the appeal of drones with people around the world.

Thank you for your continued support!`,
    image_url: '/images/Newsphoto_DSJ_release.jpg',
  },
  {
    date: '2025-09-03',
    title_ja: 'クラウドファンディングのプロジェクトをキックオフしました！',
    title_en: 'Crowdfunding Project Launched!',
    content_ja: `こんにちは！山本悠貴です！

このたび、ドイツで開催されるドローンレースの世界大会「MultiGP European Championship」に出場します！

世界トップレベルの選手たちと同じ舞台で戦えるチャンスですが、遠征にかかる渡航費・機材費などがとても大きく、正直、自分ひとりの力では難しい部分もあります。

そこで、クラウドファンディングに挑戦することにしました！
ご支援いただけたら嬉しいですし、いいねやシェアしていただけると大変助かります🙇

▶️ クラファンページはこちら
https://camp-fire.jp/projects/876711/view

最後まで全力で走り抜けます！！
どうか応援、よろしくお願いします！！`,
    content_en: `Hello! This is Yuki Yamamoto!

I will be participating in the world championship drone racing competition "MultiGP European Championship" held in Germany!

This is a chance to compete on the same stage as the world's top-level racers, but the travel and equipment costs for the expedition are very high, and honestly, it's difficult to manage on my own.

So, I've decided to try crowdfunding!
I would be happy if you could support me, and I would greatly appreciate likes and shares🙇

▶️ Crowdfunding page here
https://camp-fire.jp/projects/876711/view

I will give it my all until the end!!
Please support me!!`,
    image_url: '/images/NewsPhoto_Kickoff.png',
  },
  {
    date: '2025-09-05',
    title_ja: 'クラウドファンディング目標金額に達成しました！',
    title_en: 'Crowdfunding Goal Achieved!',
    content_ja: `皆さんこんにちは！山本悠貴です！

皆さんの支援により、目標の１つであるドイツと韓国のレースに出場できる金額を集めることができました！

ご支援、拡散してくださった方、心から感謝申し上げます！

そして次の目標であるアメリカのレースに出場するために引き続き拡散や支援していただけると幸いです！

引き続きよろしくお願いいたします！`,
    content_en: `Hello everyone! This is Yuki Yamamoto!

Thanks to everyone's support, we were able to raise enough funds to participate in one of our goals: the races in Germany and Korea!

I sincerely thank everyone who supported and shared the campaign!

I would appreciate your continued sharing and support to achieve our next goal of participating in the race in America!

Thank you for your continued support!`,
    image_url: '/images/NewsPhoto_Achieve_founding.jpg',
  },
  {
    date: '2025-09-09',
    title_ja: 'ドロサツ!!様にスポンサーとしてサポートしていただけることになりました！',
    title_en: 'Drosatsu!! to Sponsor Our Activities!',
    content_ja: `このたび、ドイツで開催される世界大会に向けて、ドロサツ様にスポンサーとしてサポートしていただけることになりました！

＜ドロサツ様について＞
DJI正規ディーラであるドローンの販売・レンタルは【ドロサツ!!】へ！ 法人導入から個人利用まで幅広くサポートします。
Webサイトはこちら→https://drosatsu.jp/`,
    content_en: `We are pleased to announce that Drosatsu!! will be sponsoring our activities for the world championship held in Germany!

＜About Drosatsu!!＞
For DJI authorized dealer drone sales and rentals, visit 【Drosatsu!!】! We provide comprehensive support from corporate implementation to personal use.
Website here→https://drosatsu.jp/`,
    image_url: '/images/NewsPhoto_Drosatsu.webp',
  },
  {
    date: '2025-09-21',
    title_ja: '102万円の支援をいただき、クラウドファンディング終了しました！',
    title_en: 'Crowdfunding Completed with 1.02 Million Yen in Support!',
    content_ja: `クラウドファンディング終了しました！

最終的に102万8500円のご支援をいただきました！本当にありがとうございます🙇‍♂️

いただいた資金はドイツ・韓国・アメリカのレースで大切に使わせていただきます。`,
    content_en: `The crowdfunding campaign has ended!

We received a total of 1,028,500 yen in support! Thank you so much🙇‍♂️

The funds received will be used carefully for the races in Germany, Korea, and America.`,
    image_url: '/images/NewsPhoto_Goal＿founding.png',
  },
];

// Achievements data
const achievementsData = {
  ja: {
    '2025': [
      'FAI Riyadh RDWC 10位',
      'WTW 全国大会 2025 東京予選　優勝',
      'JDL 2025 Roun2 Pro Class 準優勝',
      'MultiGP Internatinal Open 9位',
      'FAI WDC2025 Junior class 4位',
      'MultiGP MultiGP European Championship 15位',
      'MultiGP Championship Pro Class 11位',
      'JDL Round7 Pro Class 3位',
      'WTW全国大会2025 優勝',
      'F9U 日本選手権 準優勝'
    ],
    '2024': [
      'Jupiter Drone Challenge 2024 第3位',
      'FAI World Drone Racing Championship 日本代表',
      'FAI Korea World Drone Racing Masters 第6位',
      'FAI WDRC TEAM JAPAN 国別世界第3位',
      'WTW CUP 東京予選　優勝',
      'WTW CUP 全国大会　チャンピオン',
      'F9U 日本選手権　準優勝'
    ],
    '2023': [
      'Japan Drone League 2023 4位',
      'Aso DroneRace 優勝',
      'Japan Drone League 2023 Round 1 3位',
      'Japan Drone League 2023 Round 5 3位',
      'Jupiter Cup 2023 vol.3 優勝',
      'FAI 2023 Namwon, Korea 12th',
      'Jupiter Cup 2023 vol.4 優勝',
      'Jupiter Cup 2023 年間チャンピオン',
      'Kaizuka Glowing Cup 2023 第2位',
      'JDSF 富士急ハイランド　第2位',
      'JDL 2023 年間ランキング4位'
    ],
    '2022': [
      'JAPAN Tiny Drone Champions League 2022 年間第3位',
      'Aso DroneRace 優勝',
      'Yuzawa Cup 2022 優勝',
      'Drone Racing CUP Hiroshima Tiny whoop 優勝',
      'Jupiter cup Kumamoto 優勝',
      'ROBOZ CUP 2022 第2位',
      'Kaizuka Glowing Cup 2022 第3位',
      '戦国ドローンレース　優勝',
      'Jupiter Cup 2022 vol.4 優勝',
      'Jupiter Cup 2022年間チャンピオン',
      'JMA 2022 Okayama 第3位'
    ],
    '2021': [
      'JMA年間チャンピオン',
      'JMA CUP TOKYO 第4位',
      'Jupiter CUP 2021 vol.1 優勝',
      'JMA CUP Nigata 第2位',
      'JMA CUP Tokushima 第2位',
      'Jupiter Cup vol.2 第3位',
      'HDRA Cup 優勝',
      '京都　貴船口駅レース　第2位',
      'WTW CUP　世田谷学園　優勝',
      'JMA Osaka Cup　第2位',
      'DRONE VILLAGE タイムレコード1位',
      'JMA Fukuoka Cup 優勝',
      'ROBOZ CUP 第3位',
      'JMA　年間ランキング第２位',
      'Jupiter Cup 年間チャンピオン'
    ],
    '2020': [
      'JDL 2020 Round4 Open Class 2位',
      'EBN_Cap R4 C main 優勝',
      'WTW Cup 2020 vol.6 優勝',
      'Jupiter Cup 2020 優勝'
    ]
  },
  en: {
    '2025': [
      'FAI Riyadh RDWC 10th Place',
      'WTW National Championship 2025 Tokyo Qualifier Winner',
      'JDL 2025 Round 2 Pro Class 2nd Place',
      'MultiGP International Open 9th Place',
      'FAI WDC2025 Junior Class 4th Place',
      'MultiGP European Championship 15th Place',
      'MultiGP Championship Pro Class 11th Place',
      'JDL Round 7 Pro Class 3rd Place',
      'WTW National Championship 2025 Winner',
      'F9U Japan Championship 2nd Place'
    ],
    '2024': [
      'Jupiter Drone Challenge 2024 3rd Place',
      'FAI World Drone Racing Championship Japan Representative',
      'FAI Korea World Drone Racing Masters 6th Place',
      'FAI WDRC TEAM JAPAN World 3rd Place',
      'WTW CUP Tokyo Qualifier Winner',
      'WTW CUP National Championship Champion',
      'F9U Japan Championship 2nd Place'
    ],
    '2023': [
      'Japan Drone League 2023 4th Place',
      'Aso DroneRace Winner',
      'Japan Drone League 2023 Round 1 3rd Place',
      'Japan Drone League 2023 Round 5 3rd Place',
      'Jupiter Cup 2023 vol.3 Winner',
      'FAI 2023 Namwon, Korea 12th Place',
      'Jupiter Cup 2023 vol.4 Winner',
      'Jupiter Cup 2023 Annual Champion',
      'Kaizuka Glowing Cup 2023 2nd Place',
      'JDSF Fuji-Q Highland 2nd Place',
      'JDL 2023 Annual Ranking 4th Place'
    ],
    '2022': [
      'JAPAN Tiny Drone Champions League 2022 Annual 3rd Place',
      'Aso DroneRace Winner',
      'Yuzawa Cup 2022 Winner',
      'Drone Racing CUP Hiroshima Tiny whoop Winner',
      'Jupiter Cup Kumamoto Winner',
      'ROBOZ CUP 2022 2nd Place',
      'Kaizuka Glowing Cup 2022 3rd Place',
      'Sengoku Drone Race Winner',
      'Jupiter Cup 2022 vol.4 Winner',
      'Jupiter Cup 2022 Annual Champion',
      'JMA 2022 Okayama 3rd Place'
    ],
    '2021': [
      'JMA Annual Champion',
      'JMA CUP TOKYO 4th Place',
      'Jupiter CUP 2021 vol.1 Winner',
      'JMA CUP Niigata 2nd Place',
      'JMA CUP Tokushima 2nd Place',
      'Jupiter Cup vol.2 3rd Place',
      'HDRA Cup Winner',
      'Kyoto Kibuneguchi Station Race 2nd Place',
      'WTW CUP Setagaya Gakuen Winner',
      'JMA Osaka Cup 2nd Place',
      'DRONE VILLAGE Time Record 1st Place',
      'JMA Fukuoka Cup Winner',
      'ROBOZ CUP 3rd Place',
      'JMA Annual Ranking 2nd Place',
      'Jupiter Cup Annual Champion'
    ],
    '2020': [
      'JDL 2020 Round 4 Open Class 2nd Place',
      'EBN_Cap R4 C main Winner',
      'WTW Cup 2020 vol.6 Winner',
      'Jupiter Cup 2020 Winner'
    ]
  }
};

async function restoreData() {
  console.log('データを復元しています...');

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log('既存のデータをクリアしています...');
  db.prepare('DELETE FROM news').run();
  db.prepare('DELETE FROM achievements').run();

  // Migrate news
  console.log('お知らせを復元しています...');
  const insertNews = db.prepare(
    'INSERT INTO news (date, title_ja, title_en, content_ja, content_en, image_url) VALUES (?, ?, ?, ?, ?, ?)'
  );

  for (const news of newsData) {
    insertNews.run(
      news.date,
      news.title_ja,
      news.title_en,
      news.content_ja,
      news.content_en,
      news.image_url
    );
  }
  console.log(`✓ ${newsData.length}件のお知らせを復元しました`);

  // Migrate achievements
  console.log('実績を復元しています...');
  const insertAchievement = db.prepare(
    'INSERT INTO achievements (year, text_ja, text_en) VALUES (?, ?, ?)'
  );

  let achievementCount = 0;
  for (const year of Object.keys(achievementsData.ja)) {
    const jaAchievements = achievementsData.ja[year as keyof typeof achievementsData.ja];
    const enAchievements = achievementsData.en[year as keyof typeof achievementsData.en];

    for (let i = 0; i < jaAchievements.length; i++) {
      insertAchievement.run(year, jaAchievements[i], enAchievements[i]);
      achievementCount++;
    }
  }
  console.log(`✓ ${achievementCount}件の実績を復元しました`);

  console.log('データの復元が完了しました！');
}

restoreData().then(() => {
  db.close();
  process.exit(0);
}).catch((error) => {
  console.error('復元エラー:', error);
  db.close();
  process.exit(1);
});

