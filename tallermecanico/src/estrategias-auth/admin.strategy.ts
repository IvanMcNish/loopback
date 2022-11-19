import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Request,
  RedirectRoute,
  HttpErrors,
  assignRouterSpec,
} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {ParamsDictionary} from 'express-serve-static-core';
import parseBearerToken from 'parse-bearer-token';
import {ParsedQs} from 'qs';
import {AutenticacionService} from '../services';

export class estrategiaAdmin implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(AutenticacionService)
    private autenticationService: AutenticacionService,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);

    if (token) {
      const datos = this.autenticationService.validarToken(token);

      if (datos) {
        let profile: UserProfile = Object.assign({
          correo: datos.data.correo
        });

        return profile;
      } else {
        throw new HttpErrors[401]('Token invalido');
      }
    } else {
      throw new HttpErrors[401]('No hay token en la solicitud');
    }
  }
}
