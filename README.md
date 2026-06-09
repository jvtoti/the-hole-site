> 🔗 **VERCEL:** https://the-hole-club.vercel.app

# 🕳️ Site institucional · The Hole

Site estático (HTML + CSS + JS puro, sem build) para o The Hole, bar e lounge para o público masculino em Ribeirão Preto.

Direção de design: **dark luxury / editorial noturno**. Paleta **preto e vermelho** (o vermelho entra pela luz e atmosfera, nunca por corpos). Reposicionamento "experiência > sexo" aplicado em toda a copy (ver `../POSICIONAMENTO-The-Hole.md`).

## Estrutura

```
site/
├── index.html        Home
├── a-casa.html       A Casa (manifesto, atmosfera, safe space)
├── agenda.html       Agenda (noites da casa + ocasiões VIP)
├── bar.html          Bar (carta + signatures em breve)
├── reservas.html     Reservas (formulário → WhatsApp)
├── contato.html      Contato (endereço, horários, portaria, mapa)
├── css/  tokens.css · base.css · components.css · pages.css
├── js/   main.js     (age gate 18+, nav mobile, reveals, reserva→WhatsApp)
└── assets/img/       6 fotos autorais (geradas, atmosféricas, sem nudez)
```

## Recursos

- **Age gate 18+** (lembra a escolha via localStorage)
- **Reserva pelo WhatsApp**: o formulário monta a mensagem e abre o `wa.me`
- **100% responsivo** (mobile-first, ~80% do público é mobile)
- **SEO local** (titles, meta description, JSON-LD `BarOrPub`)
- **Acessível**: respeita `prefers-reduced-motion`, foco visível, HTML semântico
- **Leve**: ~1,7 MB com as 6 fotos (JPEG otimizado), zero dependências de JS

---

## ⚠️ TROCAR ANTES DE PUBLICAR

| O quê | Onde | Valor atual (placeholder) |
|---|---|---|
| **Número de WhatsApp** | `js/main.js` (const `WHATSAPP`) + links `wa.me` em todas as páginas | `5516000000000` |
| **Instagram** | links no header/footer e contato | `https://instagram.com` / `@thehole` |
| **Endereço completo** | `contato.html` | "Ribeirão Preto · SP" (sem rua) |
| **Horários reais** | `contato.html` | "Quinta a sábado · à noite" |
| **Mapa** | `contato.html` (iframe) | busca genérica "Ribeirão Preto" |
| **Logo** | wordmark tipográfico "The H(o)le" | aguardando logo aprovada no ClickUp `86ahpzk3j` |
| **Fotos** | `assets/img/` | autorais geradas; trocar por fotos reais da casa quando houver |
| **Carta do bar** | `bar.html` | itens ilustrativos, sem preços (carta real na casa) |
| **Agenda** | `agenda.html` | noites recorrentes ilustrativas + datas "em breve" |

> Dica: o WhatsApp aparece em vários lugares. Buscar e substituir `5516000000000` em todo o `site/` resolve de uma vez.

## Rodar localmente

```bash
cd site
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Deploy (sugestão: Vercel)

Site 100% estático, publica direto. Ainda **não há domínio** definido para o The Hole.

```bash
cd site
vercel        # preview
vercel --prod # produção
```

Obs.: a pasta-mãe do cliente já tem um projeto Vercel `the-hole-proposta` (que é a **proposta**, não o site). Este site institucional deve ter **projeto/deploy próprios**.

---

*Criado pela Cítara Marketing IA · Claude Design.*
