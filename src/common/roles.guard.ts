import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/roles/role.enum";
import { ROLES_KEY } from "src/roles/roles.decorators";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    
    constructor(
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user;

        if (user) {
            return requiredRoles.some(role => user.roles.some(userRole => userRole === role));
        }

        return true;

    }
}