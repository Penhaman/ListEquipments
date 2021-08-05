export const getUserLvl = (value) => {

    var arr = ['Administrador','Comercial'];
    return arr[value-1];
};
export const getUserLvlLabel = (value) => {
    
    var arr = ['primary','secondary'];
    return arr[value-1];
};

export const getStatus = (value) => {
    var arr = ['Pendente', "Em Progresso..", "Completo"];
    return arr[value-1];
}
export const getStatusLabel = (value) => {
    var arr = ['default', 'primary', 'secondary'];
    return arr[value-1];

}