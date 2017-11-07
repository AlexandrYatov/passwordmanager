import { Injectable } from '@angular/core';

interface ICache {
  [ key: string ]: any;
}

@Injectable()
export class LocalStorageService {

  private cache: ICache;
  private keyPrefix: string;

  constructor() {
    this.cache = Object.create( null );
    this.keyPrefix = 'ng2-demo-';

    window.addEventListener( 'storage', this.handleStorageEvent );
  }

  public getItem( key: string ) : any {

    const normalizeKey = this.normalizeKey( key );

    if ( normalizeKey in this.cache ) {
      return( this.cache[ normalizeKey ] );
    }

    console.warn( 'Reading from underlying localStorage.' );

    return( this.cache[ normalizeKey ] = JSON.parse( localStorage.getItem( normalizeKey ) ) );
  }

  public setItem( key: string, value: any ): void {

    const normalizeKey = this.normalizeKey( key );

    this.cache[ normalizeKey ] = value;

    localStorage.setItem( normalizeKey, JSON.stringify( value ) );

  }
  private handleStorageEvent = ( event: StorageEvent ): void => {

    if ( ! event.key.startsWith( this.keyPrefix ) ) {

      return;

    }

    console.warn( 'LocalStorage Event: [', event.key, ']' );

    if ( event.newValue === null ) {

      delete( this.cache[ event.key ] );

    } else {

      this.cache[ event.key ] = JSON.parse( event.newValue );

      console.table( this.cache[ event.key ] );

    }

  }

  private normalizeKey( key: string ): string {

    return( this.keyPrefix + key );

  }
}
