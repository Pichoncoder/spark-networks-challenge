
export default (property: number, value: number[]): boolean => {
    return property >= value[0] && property <= value[1];
}
