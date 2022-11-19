import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Credenciales, Propietario} from '../models';
import {PropietarioRepository} from '../repositories';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PropietarioRepository)
    private propietarioRepository: PropietarioRepository,
  ) {}

  /*
   * Add service methods here
   */
  async autenticar(credenciales: Credenciales): Promise<any> {
    try {
      let propietario = this.propietarioRepository.findOne({
        where: {
          correo: credenciales.correo,
          contrasenia: credenciales.contrasenia,
        },
      });
      return propietario;
    } catch (error) {
      return null;
    }
  }

  async generarToken(propietario: Propietario): Promise<string> {
    let token = await jwt.sign(
      {
        data: {
          correo: propietario.correo,
          contrasenia: propietario.contrasenia
        }
      },
      'keysecretxxx'
    )
    return token;
  }
  validarToken(token: string): any{

    try {
      let datos = jwt.verify(token, 'keysecretxxx')
    }catch (error){
      return null;
    }
    
  }
}
