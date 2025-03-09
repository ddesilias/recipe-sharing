import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'http://localhost:5454/api';

  recipeSubject = new BehaviorSubject<any>({
    recipes: [],
    loading: false,
    newRecipe: null,
  });

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getRecipes(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/recipe`, { headers: this.getHeaders() })
      .pipe(
        tap((recipes) => {
          this.recipeSubject.next({ ...this.recipeSubject.value, recipes });
        })
      );
  }

  getRecipeById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipe/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createRecipe(recipe: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/recipe`, recipe, {
        headers: this.getHeaders(),
      })
      .pipe(
        tap((newRecipe) => {
          this.recipeSubject.next({
            ...this.recipeSubject.value,
            recipes: [...this.recipeSubject.value.recipes, newRecipe],
            newRecipe,
          });
        })
      );
  }

  updateRecipe(recipe: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/recipe/${recipe.id}`, recipe, {
        headers: this.getHeaders(),
      })
      .pipe(
        tap((updatedRecipe: any) => {
          const updatedRecipes = this.recipeSubject.value.recipes.map(
            (item: any) => (item.id === updatedRecipe.id ? updatedRecipe : item)
          );
          this.recipeSubject.next({
            ...this.recipeSubject.value,
            recipes: updatedRecipes,
            updatedRecipe,
          });
        })
      );
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/recipe/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        tap(() => {
          const updatedRecipes = this.recipeSubject.value.recipes.filter(
            (item: any) => item.id !== id
          );
          this.recipeSubject.next({
            ...this.recipeSubject.value,
            recipes: updatedRecipes,
          });
        })
      );
  }

  likeRecipe(id: any): Observable<any> {
    return this.http
      .post(
        `${this.baseUrl}/recipe/${id}/like`,
        {},
        {
          headers: this.getHeaders(),
        }
      )
      .pipe(
        tap((likedRecipe: any) => {
          const updatedRecipes = this.recipeSubject.value.recipes.map(
            (item: any) => (item.id === likedRecipe.id ? likedRecipe : item)
          );
          this.recipeSubject.next({
            ...this.recipeSubject.value,
            recipes: updatedRecipes,
            likedRecipe,
          });
        })
      );
  }
}
