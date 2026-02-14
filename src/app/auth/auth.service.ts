import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

export type UserRole = 'Admin' | 'Manager' | 'Staff';

export interface User {
    id: number;
    email: string;
    role: UserRole;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    // Hardcoded valid users
    private readonly validUsers = [
        { email: 'admin@ef.com', password: 'Admin123', role: 'Admin' as UserRole, name: 'System Admin' },
        { email: 'manager@ef.com', password: 'Manager123', role: 'Manager' as UserRole, name: 'Store Manager' },
        { email: 'staff@ef.com', password: 'Staff123', role: 'Staff' as UserRole, name: 'Sales Staff' }
    ];

    constructor(private router: Router) {
        const savedUser = localStorage.getItem('ef_user');
        if (savedUser) {
            this.currentUserSubject.next(JSON.parse(savedUser));
        }
    }

    login(email: string, password: string): Observable<boolean> {
        const user = this.validUsers.find(u => u.email === email && u.password === password);

        if (user) {
            const { password: _, ...userWithoutPassword } = user;
            const mockUser: User = {
                id: this.validUsers.indexOf(user) + 1,
                ...userWithoutPassword
            };

            localStorage.setItem('ef_user', JSON.stringify(mockUser));
            this.currentUserSubject.next(mockUser);
            return of(true);
        } else {
            return throwError(() => new Error('Invalid email or password'));
        }
    }

    logout(): void {
        localStorage.removeItem('ef_user');
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    isLoggedIn(): boolean {
        return !!this.currentUserSubject.value;
    }

    hasRole(allowedRoles: UserRole[]): boolean {
        const user = this.getCurrentUser();
        if (!user) return false;
        return allowedRoles.includes(user.role);
    }
}
