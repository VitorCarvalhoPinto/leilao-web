export const getMask = (selectedOption) => {
    return selectedOption === 'cpf' ? '999.999.999-99' : '99.999.999/9999-99';
}