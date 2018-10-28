import * as expr from './exprTypes';
import * as filter from './filterTypes';

export class Types {
  static expr = expr;
  static filter = filter;
}

export class Filter {
  color = '';
  expr = '';
  filterType = Types.filter.POSITIVE;
  compare ='AND|OR';
  exprType = Types.expr.REGEX;
  caseSensitive = false;

  constructor (color, expr, filterType, exprType, caseSensitive) {
    this.color = color;
    this.expr = expr;
    this.filterType = filterType;
    this.exprType = exprType;
    this.caseSensitive = caseSensitive;
  }

  isMatch (text) {
    let isMatch = false;
    if ( Types.expr.PAYLOAD === this.exprType ) {
      isMatch = text.includes( this.expr );
    }
    return isMatch;
  }
}
