
# Guia de Instalação e Configuração de Projeto Angular com PO-UI e Protheus

## Requisitos
- Certifique-se de que o Node.js e o npm estão instalados.
- O `@totvs/protheus-lib-core` está disponível apenas até a versão 17. Utilize o angular na versão 17 para não ter problema.

## 1. Instalar Angular CLI
npm i -g @angular/cli@17

## 2. Criar e Configurar o Projeto Angular
### 2.1 Criar o projeto(Obs: ao criar o projeto, n coloque acentos e nem letras maiusculas, pode gerar problema quando for compilar para o protheus):
ng new nome-do-projeto
cd nome-do-projeto

### 2.2 Instalar componentes PO-UI:
ng add @po-ui/ng-components@17
ng add @po-ui/ng-templates@17

### 2.3 Instalar dependências adicionais:
- Subsink (Gerenciamento de subscrições):
  npm i subsink

- Biblioteca de integração com o Protheus:
  npm i @totvs/protheus-lib-core@17

- Tema do Protheus:
  npm i @totvs/po-theme@17

## 3. Configurações no Angular.json
Abra o arquivo `angular.json` e localize a propriedade `styles`. substitua pelas informações abaixo:
"styles": [
  "node_modules/@totvs/po-theme/css/po-theme-default-variables.min.css",
  "node_modules/@totvs/po-theme/css/po-theme-default.min.css",
  "node_modules/@po-ui/style/css/po-theme-core.min.css"
]

## 4. Ajustes na Configuração de Compilação
### 4.1 Alterações no `angular.json` (esses ajustes são necessários por estar usando a versão 17 do angular):
- Linha do builder: 
  Substitua: `"builder": "@angular-devkit/build-angular:application"` 
  por: "builder": "@angular-devkit/build-angular:browser"
  
- Linha do browser:
  Substitua: `"browser": "src/main.ts"` 
  por: "main": "src/main.ts"
  

### 4.2 Configuração no VSCode (necessário para compilar o arquivo no protheus):
- Acesse: Configurações → Extensões → Totvs Language Server Launch → Args
- Abra o arquivo JSON e adicione:
  "totvsLanguageServer.folder.extensionsAllowed": ".APP"

-- Boa pratica:
## 5. Ajustes no Código Fonte (Ajustes padrões de toda aplicação)
### 5.1 `app.module.ts`
Adicione:
import { PoTemplatesModule } from '@po-ui/ng-templates';

### 5.2 `app.component.ts`
Adicione as seguintes importações:
import { ProAppConfigService } from '@totvs/protheus-lib-core';

No constructor da classe `AppComponent`, adicione:
constructor(private propAppConfigService: ProAppConfigService) {
  if (!this.propAppConfigService.insideProtheus) {
    this.propAppConfigService.loadAppConfig();
  }
}

### 5.3 Botão de sair:
Adicione um botão de sair no menu:
typescript
{ label: 'Exit', action: this.closeApp.bind(this) }

Crie a função `closeApp`:
typescript
private closeApp() {
  if (this.propAppConfigService.insideProtheus()) {
    this.propAppConfigService.callAppClose();
  } else {
    alert('O app não está sendo executado dentro do Protheus.');
  }
}

## 6. Executar o Projeto
- Para iniciar o servidor e abrir o navegador:
  ng serve -o
  
- Para compilar o projeto:
  ng build
  