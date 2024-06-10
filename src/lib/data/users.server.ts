/**
 * System admin
 * @param userEmail 
 * @returns true if user is admin and can manage all events
 */
export const isAdmin = (userEmail: string) => {
    if (['techplex.engineer@gmail.com', 'blake@team4909.org'].includes(userEmail)) {
        return true;
    }
    return false;
}