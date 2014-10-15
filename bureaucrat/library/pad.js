var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    library = bureaucrat.library || (bureaucrat.library = { });

library.pad = function(value, digits) {
  var amount,
      digits = +digits,
      pad = '';

  if (!digits) {
    digits = 2;
  }

  amount = digits - value.toString().length;

  while (pad.length < amount) {
    pad += '0';
  }

  return pad + value;
};
