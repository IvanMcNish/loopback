// Uncomment these imports to begin using these cool features!

import {service} from '@loopback/core';
import {getModelRelations} from '@loopback/repository';
import {
  getModelSchemaRef,
  HttpErrors,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Credenciales} from '../models';
import {AutenticacionService} from '../services';


// import {inject} from '@loopback/core';

export class LoginController {
  constructor(
    @service(AutenticacionService)
    private autenticaionService: AutenticacionService,
  ) {}

  @post('/login')
  @response(200, {
    Description: 'Usuario model instance',
    content: {'application/jason': {schema: getModelSchemaRef(Credenciales)}},
  })
  async login(@requestBody() credenciales: Credenciales) {
    let propietario = await this.autenticaionService.autenticar(credenciales);

    if (propietario) {
      let token = this.autenticaionService.generarToken(propietario);
      return{
        data: propietario,
        token

      }

    } else {
      throw new HttpErrors[401]('Datos incorrectos');
    }

   
  }
}
