# Star wars API

## Version: 0.0.1

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

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| search | query | Realiza a busca filtrando planetas que **contenham** a palavra pesquisada em seu **nome** | No | string |
| page | query | Informa a página desejada para listagem dos planetas | Yes | integer |
| limit | query | Informa a quantidade de planetas por página serão exibidos. O máximo de registros permitidos são 100, **excendendo o limite o valor padrão será assumido**.  | No | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Um Array de planetas | [ [PersistPlanetResponse](#persistplanetresponse) ] |
| default | Um erro | [DefaultErrorResponse](#defaulterrorresponse) |

#### POST
##### Summary:

Cria um planeta

##### Description:

Este endpoint persiste um novo planeta.
Ressaltando que a quantidade de aparições nos filmes do star wars é feita automaticamente pela API publica do SWAPI.


##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| planet | body | Planeta a ser persistido | Yes | [PlanetInput](#planetinput) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Um objeto contendo informações sobre o planeta persistido e informações sobre o recurso | [PersistPlanetResponse](#persistplanetresponse) |
| 400 | Um erro informando qual foi a operação inválida | [BadRequestResponse](#badrequestresponse) |
| default | Um erro | [DefaultErrorResponse](#defaulterrorresponse) |

### /planets/:id

#### GET
##### Summary:

Lista apenas um planeta

##### Description:

Este endpoint retorna o planeta pelo ID.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID do planeta | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Um planeta | [Planet](#planet) |
| 404 | Uma mensagem de planeta não encontrado | [NotFoundResponse](#notfoundresponse) |
| default | Um erro inesperado | [DefaultErrorResponse](#defaulterrorresponse) |

#### PUT
##### Summary:

Atualiza um planeta

##### Description:

Este endpoint atualiza as informações de um determinado planeta.


##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| planet | body | Planeta a ser atualizado | Yes | [PlanetInput](#planetinput) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Um objeto contendo informações sobre o planeta atualizado e informações sobre o recurso | [PersistPlanetResponse](#persistplanetresponse) |
| 400 | Um erro informando qual foi a operação inválida | [BadRequestResponse](#badrequestresponse) |
| 404 | Um erro informando que o planeta não foi encontrado | [NotFoundResponse](#notfoundresponse) |
| default | Um erro | [DefaultErrorResponse](#defaulterrorresponse) |

#### DELETE
##### Summary:

Remove um planeta

##### Description:

Este endpoint remove um planeta.


##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID do planeta a ser removido | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Um objeto contendo informações sobre o status da operação e informações sobre o recurso | [RemovePlanetResponse](#removeplanetresponse) |
| 404 | Um erro informando que o planeta não foi encontrado | [NotFoundResponse](#notfoundresponse) |
| default | Um erro | [DefaultErrorResponse](#defaulterrorresponse) |

### Models


#### Planet

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string | Código identificador do planeta | No |
| name | string | Nome do planeta | No |
| climate | string | Clima do planeta | No |
| terrain | string | Terreno do planeta | No |
| countFilms | integer | Quantidade de filmes associados a este planeta | No |
| films | [ [FilmReference](#filmreference) ] | Referências aos filmes associados a este planeta | No |

#### PlanetInput

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string | Nome do planeta | No |
| climate | string | Clima do planeta | No |
| terrain | string | Terreno do planeta | No |

#### FilmReference

Representa a URL com as informações do filme fornecida pela api https://swapi.co.

Exemplo "https://swapi.co/api/films/1/"


| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| FilmReference | string | Representa a URL com as informações do filme fornecida pela api https://swapi.co.  Exemplo "https://swapi.co/api/films/1/"  |  |

#### PersistPlanetResponse

Um objeto contendo as informações do recente planeta persistido

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| planet | object | O planeta | No |
| url | string | URL para acessar este planeta | No |
| resouce | string | O recurso utilizado para persistir este planeta | No |
| methodAllowed | string | Descrição dos metodos disponíveis para este recurso | No |

#### RemovePlanetResponse

Um objeto contendo as informações do recente planeta persistido

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| status | string | Status da operação | No |
| resouce | string | O recurso utilizado para realizar a remoção do planeta | No |
| methodAllowed | string | Descrição dos metodos disponíveis para este recurso | No |

#### DefaultErrorResponse

Uma mensagem de erro padrão

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| code | integer | Código do erro | No |
| msg | string | Mensagem de erro | No |
| stack | object | Stack de erro, caso não exista um valor nulo é retornado | No |

#### BadRequestResponse

Uma mensagem de erro que será modificada conforme as ações do usuário que não
cumprirem com algumas regras de negócio.
Exemplo - "Nome inválido"


| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| code | integer | Código do erro | No |
| msg | string | Mensagem de erro | No |
| stack | object | Stack de erro, caso não exista um valor nulo é retornado | No |

#### NotFoundResponse

Uma mensagem de erro que informará que tal recurso não foi encontrado

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| code | integer | Código do erro | No |
| msg | string | Mensagem de erro | No |
| stack | object | Stack de erro, caso não exista um valor nulo é retornado | No |
