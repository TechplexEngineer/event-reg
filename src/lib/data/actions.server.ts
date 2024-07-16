
const actions = [
    {
        id: 1,
        for: "NERD 24",
        title: "Pay Registration Fee",
        dueDate: Date.parse('June 30, 2024'),
        description: `Pay the registration fee for the New England Robotics Derby 2024`,
    },
    {
        id: 2,
        for: "BC 24",
        title: "Pay Registration Fee",
        dueDate: Date.parse('May 30, 2024'),
        description: `Pay the registration fee for BattleCry 2024`,
    }
]

export const getActions = () => {
    return actions
}