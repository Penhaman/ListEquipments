export const getUserLvl = (value) => {

    var arr = ['Admin','Manager','Public'];
    return arr[value-1];
};
export const getUserLvlLabel = (value) => {
    
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