const SKILLS = '/assets/icons/skills'
const MISC = '/assets/icons/misc'

/** 技術名 → アイコン画像。スキル一覧・プロジェクトのカード・詳細モーダルで共通に使う */
export const TECH_ICONS: Record<string, string> = {
  // 言語
  Python: `${SKILLS}/python.svg`,
  Go: `${SKILLS}/go.svg`,
  Java: `${SKILLS}/java.svg`,
  Kotlin: `${SKILLS}/kotlin.svg`,
  PHP: `${SKILLS}/php.svg`,
  Ruby: `${SKILLS}/ruby.svg`,
  HTML: `${SKILLS}/html5.svg`,
  CSS: `${SKILLS}/css3.svg`,
  'C#': `${SKILLS}/c-sharp.svg`,
  // フレームワーク・ライブラリ
  Echo: `${SKILLS}/echo.png`,
  'Spring Boot': `${SKILLS}/spring-boot.svg`,
  FastAPI: `${SKILLS}/fast-api.svg`,
  'Ruby on Rails': `${SKILLS}/rails.svg`,
  React: `${SKILLS}/reactjs.svg`,
  'Next.js': `${SKILLS}/nextjs.svg`,
  Vite: `${SKILLS}/vitejs.svg`,
  'Tailwind CSS': `${SKILLS}/tailwindcss.svg`,
  Unity: `${SKILLS}/unity-svgrepo-com.svg`,
  // データベース
  PostgreSQL: `${SKILLS}/postgresql.svg`,
  MySQL: `${SKILLS}/mysql.svg`,
  SQLite: `${SKILLS}/SQLite.svg`,
  // ツール・インフラ
  Git: `${SKILLS}/git.svg`,
  GitHub: `${SKILLS}/github-dark.svg`,
  'GitHub Actions': `${SKILLS}/GitHub%20Actions.svg`,
  Docker: `${SKILLS}/docker.svg`,
  nginx: `${SKILLS}/nginx.svg`,
  Heroku: `${SKILLS}/heroku.svg`,
  Vercel: `${SKILLS}/vercel-dark.svg`,
  Cloudflare: `${SKILLS}/cloudflare.svg`,
  Ansible: `${SKILLS}/ansible.svg`,
  Slurm: `${SKILLS}/slurm.png`,
  Apptainer: `${SKILLS}/apptainer.svg`,
  JupyterHub: `${SKILLS}/jupyter.svg`,
  Ollama: `${SKILLS}/ollama.svg`,
  LiteLLM: `${SKILLS}/litellm.svg`,
  SearXNG: `${SKILLS}/searxng.svg`,
  MCP: `${SKILLS}/mcp.svg`,
  Codex: `${SKILLS}/codex.svg`,
  'Claude Code': `${SKILLS}/claude-code.svg`,
  'Raspberry Pi': `${SKILLS}/raspberry-pi.svg`,
  // ハードウェア・その他
  'Wake-on-LAN': `${MISC}/power.svg`,
  'Meta Quest 2': `${MISC}/vr.svg`,
  ESP32: `${MISC}/esp32.svg`,
  ポテンショメータ: `${MISC}/sensor.svg`,
  サーボモータ: `${MISC}/servo.svg`,
  '3Dプリンタ': `${MISC}/3d-print.svg`,
}
