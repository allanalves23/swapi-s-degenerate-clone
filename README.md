# Star wars API

## Version: 0.0.2

**Contact information:**  
Allan Wanderley Alves  
awallan259@gmail.com  

**License:** [MIT](http://opensource.org/licenses/MIT)

### /planets

#### GET
##### Summary:

Listagem de planetas / Listagem de planetas por filtro

##### Description:

Este endpoint retorna a listagem dos planetas. Filtrando por nome e também com páginação implementada.


##### Parameters

| Nome | Localizado na | Descrição | Requerido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| search | query | Realiza a busca filtrando planetas que **contenham** a palavra pesquisada em seu **nome** | Não | string |
| page | query | Informa a página desejada para listagem dos planetas | Sim | integer |
| limit | query | Informa a quantidade de planetas por página serão exibidos. O máximo de registros permitidos são 100, **excendendo o limite o valor padrão será assumido**.  | Não | integer |

##### Responses

| Código | Descrição | Schema |
| ---- | ----------- | ------ |
| 200 | Um Array de planetas | [ [PersistPlanetResponse](#persistplanetresponse) ] |
| 500 | Um erro | [DefaultErrorResponse](#defaulterrorresponse) |

#### POST
##### Summary:

Cria um planeta

##### Description:

Este endpoint persiste um novo planeta.
Ressaltando que a quantidade de aparições nos filmes do star wars é feita automaticamente pela API publica do SWAPI.
Ou seja, é necessário informar um nome de planeta válido dentro do universo, caso queira que possua filmes relacionados. Ao informar um planeta que não esteja dentro do universo do filme, a quantidade de filmes será 0 (zero).


##### Parameters

| Nome | Localizado na | Descrição | Requerido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| planet | body | Planeta a ser persistido | Sim | [PlanetInput](#planetinput) |

##### Responses

| Código | Descrição | Schema |
| ---- | ----------- | ------ |
| 201 | Um objeto contendo informações sobre o planeta persistido e informações sobre o recurso | [PersistPlanetResponse](#persistplanetresponse) |
| 400 | Um erro informando qual foi a operação inválida | [BadRequestResponse](#badrequestresponse) |
| 500 | Um erro | [DefaultErrorResponse](#defaulterrorresponse) |

### /planets/:id

#### GET
##### Summary:

Lista apenas um planeta

##### Description:

Este endpoint retorna o planeta pelo ID.

##### Parameters

| Nome | Localizado na | Descrição | Requerido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID do planeta | Sim | string |

##### Responses

| Código | Descrição | Schema |
| ---- | ----------- | ------ |
| 200 | Um planeta | [Planet](#planet) |
| 404 | Uma mensagem de planeta não encontrado | [NotFoundResponse](#notfoundresponse) |
| 500 | Um erro inesperado | [DefaultErrorResponse](#defaulterrorresponse) |

#### PUT
##### Summary:

Atualiza um planeta

##### Description:

Este endpoint atualiza as informações de um determinado planeta.


##### Parameters

| Nome | Localizado na | Descrição | Requerido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID do planeta a ser atualizado | Sim | string |
| planet | body | Planeta a ser atualizado | Sim | [PlanetInput](#planetinput) |

##### Responses

| Código | Descrição | Schema |
| ---- | ----------- | ------ |
| 200 | Um objeto contendo informações sobre o planeta atualizado e informações sobre o recurso | [PersistPlanetResponse](#persistplanetresponse) |
| 400 | Um erro informando qual foi a operação inválida | [BadRequestResponse](#badrequestresponse) |
| 404 | Um erro informando que o planeta não foi encontrado | [NotFoundResponse](#notfoundresponse) |
| 500 | Um erro | [DefaultErrorResponse](#defaulterrorresponse) |

#### DELETE
##### Summary:

Remove um planeta

##### Description:

Este endpoint remove um planeta.


##### Parameters

| Nome | Localizado na | Descrição | Requerido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID do planeta a ser removido | Sim | string |

##### Responses

| Código | Descrição | Schema |
| ---- | ----------- | ------ |
| 200 | Um objeto contendo informações sobre o status da operação e informações sobre o recurso | [RemovePlanetResponse](#removeplanetresponse) |
| 404 | Um erro informando que o planeta não foi encontrado | [NotFoundResponse](#notfoundresponse) |
| 500 | Um erro | [DefaultErrorResponse](#defaulterrorresponse) |

### /docs

#### GET
##### Summary:

Obtém o link da documentação

##### Description:

Este endpoint retorna um JSON informando o link da documentação no GitHub

##### Responses

| Codigo | Descrição | Schema |
| ---- | ----------- | ------ |
| 200 | Link para documentação | [SchemaResponse](#schemaresponse) |
| 500 | Um erro inesperado | [DefaultErrorResponse](#defaulterrorresponse) |


### Models


#### Planet

| Nome | Tipo | Descrição | Requerido | 
| ---- | ---- | ----------- | -------- |
| id | string | Código identificador do planeta | Nunca |
| name | string | Nome do planeta | Sim |
| climate | string | Clima do planeta | Sim |
| terrain | string | Terreno do planeta | Sim |
| countFilms | integer | Quantidade de filmes associados a este planeta | Nunca |
| films | [ [FilmReference](#filmreference) ] | Referências aos filmes associados a este planeta | Nunca |

#### PlanetInput

| Nome | Tipo | Descrição | Requerido |
| ---- | ---- | ----------- | -------- |
| name | string | Nome do planeta | Sim |
| climate | string | Clima do planeta | Sim |
| terrain | string | Terreno do planeta | Sim |

#### FilmReference

Representa a URL com as informações do filme fornecida pela api https://swapi.co.

Exemplo "https://swapi.co/api/films/1/"


| Nome | Tipo | Descrição |
| ---- | ---- | ----------- |
| FilmReference | string | Representa a URL com as informações do filme fornecida pela api https://swapi.co.  Exemplo "https://swapi.co/api/films/1/"  |

#### PersistPlanetResponse

Um objeto contendo as informações do recente planeta persistido

| Nome | Tipo | Descrição |
| ---- | ---- | ----------- |
| planet | object | O planeta |
| url | string | URL para acessar este planeta |
| resouce | string | O recurso utilizado para persistir este planeta |
| methodAllowed | string | Descrição dos metodos disponíveis para este recurso |

#### RemovePlanetResponse

Um objeto contendo as informações do recente planeta persistido

| Nome | Tipo | Descrição |
| ---- | ---- | ----------- |
| status | string | Status da operação |
| resouce | string | O recurso utilizado para realizar a remoção do planeta |
| methodAllowed | string | Descrição dos metodos disponíveis para este recurso |

#### DefaultErrorResponse

Uma mensagem de erro padrão

| Nome | Tipo | Descrição |
| ---- | ---- | ----------- |
| code | integer | Código do erro |
| msg | string | Mensagem de erro |
| stack | object | Stack de erro, caso não exista um valor nulo é retornado |

#### BadRequestResponse

Uma mensagem de erro que será modificada conforme as ações do usuário que não
cumprirem com algumas regras de negócio.
Exemplo - "Nome inválido"


| Nome | Tipo | Descrição |
| ---- | ---- | ----------- |
| code | integer | Código do erro |
| msg | string | Mensagem de erro |
| stack | object | Stack de erro, caso não exista um valor nulo é retornado |

#### NotFoundResponse

Uma mensagem de erro que informará que tal recurso não foi encontrado

| Nome | Tipo | Descrição |
| ---- | ---- | ----------- |
| code | integer | Código do erro |
| msg | string | Mensagem de erro |
| stack | object | Stack de erro, caso não exista um valor nulo é retornado |

#### SchemaResponse

| Nome | Tipo | Descrição |
| ---- | ---- | ----------- |
| documentation | string | Link para acesso a documentação |

