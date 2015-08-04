var currency_symbol_function = function() {
  if ( this.currency == 'USD' ) {
  	return "$";
  }
  else if ( this.currency == 'ILS' ) {
  	return "₪"
  }
  else if ( this.currency == 'EUR' ) {
  	return "€"
  }
  return "$";
}