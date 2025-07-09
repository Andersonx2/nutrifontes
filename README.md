# NutriFontes - Site da Cinthia Fontes

## Estrutura do Projeto

```
nutrifontes/
├── index.html                    # Página principal (landing page)
├── public/
│   ├── diabetes-ebook/
│   │   ├── index.html           # Página do e-book de diabetes
│   │   └── script.js            # Scripts da página do e-book
│   ├── img/                     # Imagens do projeto
│   ├── fonts/                   # Fontes personalizadas
│   ├── script.js                # Scripts globais
│   └── _redirects               # Configurações de redirecionamento
├── vercel.json                  # Configuração do Vercel
└── README.md                    # Este arquivo
```

## Rotas Configuradas

- **`/`** → Página principal (landing page da Cinthia)
- **`/diabetes-ebook`** → Página do e-book de receitas com contagem de carboidratos

## Como Funciona

1. **Página Principal**: Acesse `dominio.com` para ver a landing page da Cinthia Fontes
2. **E-book Diabetes**: Acesse `dominio.com/diabetes-ebook` para a página do e-book

## Configuração do Vercel

O arquivo `vercel.json` está configurado para:
- Servir arquivos estáticos da pasta `public`
- Redirecionar `/diabetes-ebook` para a página correta
- Manter a rota raiz funcionando normalmente

## Desenvolvimento

Para testar localmente:
1. Clone o repositório
2. Abra `index.html` no navegador para a página principal
3. Abra `public/diabetes-ebook/index.html` para a página do e-book

## Deploy

O projeto está configurado para deploy no Vercel. As rotas são automaticamente configuradas conforme o `vercel.json`. 