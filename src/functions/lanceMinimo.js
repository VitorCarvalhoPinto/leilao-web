const lanceMinimo = (lances, incremento) => {
    const lance = lances.reduce((max, l) => {
      const lanceAmount = parseFloat(l.lance.replace(/[\$,]/g, ''));
      return lanceAmount > max ? lanceAmount : max;
    }, 0);
    
    return lance;
  };

export default lanceMinimo