
let events = [
    {
        name: 'New England Robotics Derby',
        dateStr: 'October 12, 2024',
        eventSlug: 'nerd24', // often the same as eventCode but can be entered before the eventCode is assgined
        program: 'FRC'
    }
];

export const getEventBySlug = async (slug: string) => {
    return events.find(event => event.eventSlug === slug);
}

export const getTeamsByEventSlug = async (slug: string) => {
    return [
        {
            name: 'Billerica Bionics',
            type: 'FRC',
            number: 4909,
            location: 'Billerica, MA'
        },
        {
            name: 'Nashoba Robotics',
            type: 'FRC',
            number: 1768,
            location: 'Bolton, MA'
        }
    ];
}