export const getUserLvl = (value) => {

    var arr = ['Administrator','Sales'];
    return arr[value-1];
};
export const getUserLvlLabel = (value) => {
    
    var arr = ['primary','secondary'];
    return arr[value-1];
};

export const getStatus = (value) => {
    var arr = ['Waiting..', "In Progress..", "Completed"];
    return arr[value-1];
}
export const getStatusLabel = (value) => {
    var arr = ['default', 'primary', 'secondary'];
    return arr[value-1];

}