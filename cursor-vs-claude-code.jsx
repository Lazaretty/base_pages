import { useState } from "react";

const data = {
  categories: [
    {
      id: "context",
      label: "Контекст",
      icon: "⬡",
      cursor: {
        score: 7,
        title: "RAG + embeddings",
        desc: "Индексирует кодовую базу, использует векторный поиск. Меньше токенов, но теряет точные зависимости.",
        tag: "Умный поиск"
      },
      claude: {
        score: 5,
        title: "Прямое чтение файлов",
        desc: "Читает файлы целиком в контекст. Точно, но дорого по токенам. 25% лимита до первой строки кода.",
        tag: "Честный подход"
      }
    },
    {
      id: "autonomy",
      label: "Автономность",
      icon: "◈",
      cursor: {
        score: 5,
        title: "IDE-ориентированный",
        desc: "Работает внутри редактора, требует подтверждений. Хорошо для небольших правок.",
        tag: "Интерактивный"
      },
      claude: {
        score: 9,
        title: "Агентский режим",
        desc: "Запускает команды, читает ошибки, итерирует. Может сам пройти весь цикл: код → тест → фикс.",
        tag: "Полный агент"
      }
    },
    {
      id: "cost",
      label: "Стоимость",
      icon: "◇",
      cursor: {
        score: 8,
        title: "Предсказуемый",
        desc: "Фиксированная подписка $20/мес. RAG экономит токены. Легче планировать бюджет.",
        tag: "Фиксированная цена"
      },
      claude: {
        score: 4,
        title: "Токены улетают быстро",
        desc: "System prompt + исследование проекта = огромный input. Session limits кончаются неожиданно.",
        tag: "Непредсказуемо"
      }
    },
    {
      id: "quality",
      label: "Качество кода",
      icon: "◉",
      cursor: {
        score: 7,
        title: "Хорошее для правок",
        desc: "Отлично справляется с inline-правками и автодополнением. Слабее на архитектурных задачах.",
        tag: "Точечные правки"
      },
      claude: {
        score: 9,
        title: "Глубокое понимание",
        desc: "Лучше рассуждает об архитектуре, рефакторинге и сложной логике. Видит картину целиком.",
        tag: "Архитектурное мышление"
      }
    },
    {
      id: "ux",
      label: "UX",
      icon: "◎",
      cursor: {
        score: 9,
        title: "Встроен в IDE",
        desc: "Всё в одном месте: код, подсказки, чат. Diff прямо в редакторе. Не нужно переключаться.",
        tag: "Бесшовный"
      },
      claude: {
        score: 6,
        title: "Терминал + файлы",
        desc: "Нужно следить за контекстом, лимитами, историей сессий. Требует привычки.",
        tag: "Для опытных"
      }
    },
    {
      id: "multifile",
      label: "Мульти-файловость",
      icon: "⬢",
      cursor: {
        score: 7,
        title: "Через индекс",
        desc: "Хорошо находит связанные файлы через RAG. Но иногда пропускает тонкие зависимости.",
        tag: "Через поиск"
      },
      claude: {
        score: 8,
        title: "Читает что нужно",
        desc: "Сам решает какие файлы читать. Медленнее, дороже, но точнее понимает зависимости.",
        tag: "Точнее"
      }
    }
  ]
};

const ScoreBar = ({ score, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <div style={{
      flex: 1, height: "4px", background: "rgba(255,255,255,0.08)",
      borderRadius: "2px", overflow: "hidden"
    }}>
      <div style={{
        width: `${score * 10}%`, height: "100%",
        background: color, borderRadius: "2px",
        transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
      }} />
    </div>
    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", minWidth: "16px", fontVariantNumeric: "tabular-nums" }}>
      {score}/10
    </span>
  </div>
);

export default function App() {
  const [active, setActive] = useState("context");
  const [view, setView] = useState("split"); // split | cursor | claude

  const cat = data.categories.find(c => c.id === active);

  const cursorColor = "#00C4FF";
  const claudeColor = "#FF6B35";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      color: "#fff",
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      padding: "0",
      display: "flex",
      flexDirection: "column"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cat-btn { transition: all 0.2s ease; cursor: pointer; }
        .cat-btn:hover { background: rgba(255,255,255,0.06) !important; }
        .view-btn { transition: all 0.2s ease; cursor: pointer; }
        .view-btn:hover { opacity: 0.8; }
        .card { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

      {/* Header */}
      <div style={{
        padding: "32px 32px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        paddingBottom: "24px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "3px", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>
              СРАВНЕНИЕ ИНСТРУМЕНТОВ
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "22px", fontWeight: "600", color: cursorColor, fontFamily: "'IBM Plex Sans'" }}>
                Cursor
              </span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "14px" }}>vs</span>
              <span style={{ fontSize: "22px", fontWeight: "600", color: claudeColor, fontFamily: "'IBM Plex Sans'" }}>
                Claude Code
              </span>
            </div>
          </div>

          {/* View toggle */}
          <div style={{
            display: "flex", gap: "2px",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "8px", padding: "3px"
          }}>
            {[
              { id: "split", label: "Оба" },
              { id: "cursor", label: "Cursor" },
              { id: "claude", label: "Claude Code" }
            ].map(v => (
              <button key={v.id} className="view-btn" onClick={() => setView(v.id)} style={{
                padding: "5px 12px",
                borderRadius: "6px", border: "none", cursor: "pointer",
                fontSize: "11px", fontFamily: "inherit", fontWeight: "500",
                background: view === v.id
                  ? (v.id === "cursor" ? cursorColor : v.id === "claude" ? claudeColor : "rgba(255,255,255,0.12)")
                  : "transparent",
                color: view === v.id ? (v.id === "split" ? "#fff" : "#000") : "rgba(255,255,255,0.4)"
              }}>
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div style={{
          width: "160px", minWidth: "160px",
          padding: "20px 12px",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column", gap: "2px"
        }}>
          {data.categories.map(cat => {
            const diff = cat.claude.score - cat.cursor.score;
            return (
              <button key={cat.id} className="cat-btn" onClick={() => setActive(cat.id)} style={{
                padding: "10px 12px",
                borderRadius: "8px", border: "none", cursor: "pointer",
                background: active === cat.id ? "rgba(255,255,255,0.08)" : "transparent",
                color: active === cat.id ? "#fff" : "rgba(255,255,255,0.4)",
                textAlign: "left", fontFamily: "inherit",
                fontSize: "12px", fontWeight: active === cat.id ? "500" : "400",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span>{cat.label}</span>
                <span style={{
                  fontSize: "10px",
                  color: diff > 0 ? claudeColor : diff < 0 ? cursorColor : "rgba(255,255,255,0.2)",
                  fontWeight: "600"
                }}>
                  {diff > 0 ? `+${diff}` : diff < 0 ? diff : "="}
                </span>
              </button>
            );
          })}

          {/* Legend */}
          <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "2px", marginBottom: "8px" }}>
              РАЗНИЦА
            </div>
            <div style={{ fontSize: "10px", color: claudeColor, marginBottom: "4px" }}>▲ Claude Code лучше</div>
            <div style={{ fontSize: "10px", color: cursorColor }}>▼ Cursor лучше</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "24px 32px" }}>
          {/* Category header */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>{cat.icon}</span>
              <h2 style={{
                fontSize: "18px", fontWeight: "500",
                fontFamily: "'IBM Plex Sans'"
              }}>{cat.label}</h2>
            </div>
          </div>

          {/* Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: view === "split" ? "1fr 1fr" : "1fr",
            gap: "16px"
          }}>
            {(view === "split" || view === "cursor") && (
              <div className="card" style={{
                background: "rgba(0, 196, 255, 0.04)",
                border: `1px solid ${cursorColor}22`,
                borderRadius: "12px", padding: "24px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: cursorColor, fontFamily: "'IBM Plex Sans'" }}>
                    Cursor
                  </div>
                  <span style={{
                    fontSize: "10px", padding: "3px 8px",
                    background: `${cursorColor}18`, color: cursorColor,
                    borderRadius: "20px", letterSpacing: "0.5px"
                  }}>
                    {cat.cursor.tag}
                  </span>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <ScoreBar score={cat.cursor.score} color={cursorColor} />
                </div>
                <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "8px", fontFamily: "'IBM Plex Sans'" }}>
                  {cat.cursor.title}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6", fontFamily: "'IBM Plex Sans'" }}>
                  {cat.cursor.desc}
                </div>
              </div>
            )}

            {(view === "split" || view === "claude") && (
              <div className="card" style={{
                background: "rgba(255, 107, 53, 0.04)",
                border: `1px solid ${claudeColor}22`,
                borderRadius: "12px", padding: "24px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: claudeColor, fontFamily: "'IBM Plex Sans'" }}>
                    Claude Code
                  </div>
                  <span style={{
                    fontSize: "10px", padding: "3px 8px",
                    background: `${claudeColor}18`, color: claudeColor,
                    borderRadius: "20px", letterSpacing: "0.5px"
                  }}>
                    {cat.claude.tag}
                  </span>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <ScoreBar score={cat.claude.score} color={claudeColor} />
                </div>
                <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "8px", fontFamily: "'IBM Plex Sans'" }}>
                  {cat.claude.title}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6", fontFamily: "'IBM Plex Sans'" }}>
                  {cat.claude.desc}
                </div>
              </div>
            )}
          </div>

          {/* Summary row */}
          <div style={{
            marginTop: "24px",
            padding: "16px 20px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "10px",
            display: "flex", gap: "32px", flexWrap: "wrap"
          }}>
            {data.categories.map(c => {
              const diff = c.claude.score - c.cursor.score;
              const isActive = c.id === active;
              return (
                <div key={c.id}
                  onClick={() => setActive(c.id)}
                  style={{ cursor: "pointer", opacity: isActive ? 1 : 0.5, transition: "opacity 0.2s" }}>
                  <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "1.5px", marginBottom: "4px" }}>
                    {c.label.toUpperCase()}
                  </div>
                  <div style={{ display: "flex", gap: "8px", fontSize: "12px", alignItems: "center" }}>
                    <span style={{ color: cursorColor }}>{c.cursor.score}</span>
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>:</span>
                    <span style={{ color: claudeColor }}>{c.claude.score}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
