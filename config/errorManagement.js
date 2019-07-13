module.exports = app => {
    const managePlanetErrors = (error) => {
        
        const _DEFAULTERROR = {
            code: 500,
            msg: 'Ocorreu um erro desconhecido, se persistir reporte',
            stack: error

        }

        
        if(typeof error === 'string'){
            
            let _CUSTOMERROR = null
            switch(error){
                case 'Nome não informado':
                case 'Clima não informado':
                case 'Terreno não informado':
                case 'Já existe um planeta com este nome': {
                    _CUSTOMERROR = {
                        code: 400,
                        msg: error,
                        stack: error
                    }
                    break
                }
                case 'Planeta não encontrado':{
                    _CUSTOMERROR = {
                        code: 404,
                        msg: error,
                        stack: error
                    }
                    break
                }
                case 'Ocorreu um erro inesperado ao tentar remover o planeta':{
                    _CUSTOMERROR = {
                        code: 500,
                        msg: error,
                        stack: error
                    }
                    break
                }
                default: {

                    _CUSTOMERROR = _DEFAULTERROR
                }
            }

            return _CUSTOMERROR
        }else{
            return _DEFAULTERROR
        }

    }

    return {managePlanetErrors}
}