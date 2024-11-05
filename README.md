# MongoDb, .Net and Angular

Example of a setup with MongoDb, .Net and Angular

![Frontend](<Captura de tela 2024-11-04 134852.jpg>)

## Setup

> Database: [MongoDB](https://www.mongodb.com/pt-br/docs/)

> Backend: [.Net 8.0](https://learn.microsoft.com/pt-br/dotnet/core/whats-new/dotnet-8/overview)

> Frontend: [Angular 18](https://blog.angular.dev/angular-v18-is-now-available-e79d5ac0affe)

## Angular

### Generate a new component

> ng g c --no-standalone comments

### Generate a new service

> ng g s comments

### Adding components and providers

> app.module.ts

```typescript
@NgModule({
  declarations: [
    ...
    TesteComponent, // Adicionado
    ...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    ...
    provideHttpClient(), // Adicionado
  ],
  bootstrap: [AppComponent]
})
```

### Adding components to the Routes

> app-routing.module.ts

```typescript
const routes: Routes = [
  ...
  {
    path: "teste",
    component: TesteComponent
  },
  ...
];
```
