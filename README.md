# Zoo Sonoro 🦁🎨 - Site de Sons dos Animais para Crianças

Um site responsivo, limpo e super interativo construído em **HTML, CSS e JavaScript puro (sem frameworks)**, pensado para crianças pequenas interagirem com fotos e sons dos animais em tablets, celulares e computadores.

---

## 📁 Estrutura de Arquivos

```
Proje_camili/
├── index.html        # Estrutura HTML do site
├── style.css         # Estilos vibrantes, sombras e animações para crianças
├── script.js        # Lista de animais, gerenciamento de áudio e interatividade
├── vercel.json       # Configuração para deploy direto na Vercel
├── README.md         # Documentação e guia de uso
├── images/           # Pasta onde ficam as fotos dos animais (.jpg)
│   ├── cachorro.jpg
│   ├── galinha.jpg
│   ├── gato.jpg
│   ├── ovelha.jpg
│   ├── pintinho.jpg
│   ├── porco.jpg
│   └── vaca.jpg
└── audio/            # Pasta onde ficam os arquivos de som (.mp3)
    ├── cachorro.mp3
    ├── galinha.mp3
    ├── gato miando.mp3
    ├── ovelha.mp3
    ├── pintinho.mp3
    ├── porco.mp3
    └── vaca.mp3
```

---

## 🚀 Como Adicionar Novos Animais

No arquivo `script.js`, basta adicionar um novo objeto ao array `animais`:

```javascript
const animais = [
  {
    nome: "Cachorro",
    imagem: "images/cachorro.jpg",
    som: "audio/cachorro.mp3",
    cor: "#EE5253",
    corBg: "#FEF2F2"
  },
  // Adicione novos animais abaixo!
];
```

---

## 🌐 Deploy na Vercel

O projeto está 100% pronto para publicação na Vercel:
1. Acesse [vercel.com](https://vercel.com).
2. Faça upload do repositório/pasta.
3. Clique em **Deploy**!
