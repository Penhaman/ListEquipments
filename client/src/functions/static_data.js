export const getUserLvl = (value) => {
    // Solução 1
    // let nome_tipo = '';
    // if(value==1){
    //     nome_tipo = 'Administrador';
    // }else if(value==2){
    //     nome_tipo = 'Gerente';
    // }else if(value==3){
    //     nome_tipo = 'Funcionário';
    // }
    // return nome_tipo;

    // SOLUÇÃO 2
    // if(value==1){
    //     return 'Administrador';
    // }else if(value==2){
    //     return 'Gerente';
    // }else if(value==3){
    //     return 'Funcionário';
    // }
    // return '';

    //SOLUÇÃO 3
    var arr = ['Admin','Manager','Public'];
    return arr[value-1];
};
export const getUserLvlLabel = (value) => {
    //SOLUÇÃO 3
    var arr = ['primary','default','secondary'];
    return arr[value-1];
};

export const getStatus = (value) => {
    var arr = ['Waiting..', "In Progress..", "Completed"];
    return arr[value-1];
}
export const getStatusLabel = (value) => {
    var arr = ['secondary', 'default', 'primary'];
    return arr[value-1];

}