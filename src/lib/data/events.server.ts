
const events = [
    {
        name: 'New England Robotics Derby',
        date: Date.parse('October 12, 2023'),
        location: 'Tewksbury Memorial High School, 32 River Street, Billerica, MA',

        // slug cannot be "new" because we use that as the route for a new event
        eventSlug: 'nerd23', // often the same as eventCode but can be entered before the eventCode is assgined
        program: 'FRC',
        message: `Hello Teams!    
We are looking forward to hosting the 3rd annual NERD!    
Be sure to pay by the deadline as we have teams on the waitlist!`,
        contactEmail: 'blake@team4909.org',
        eventWebsite: 'https://www.newenglandroboticsderby.com/',
        teamLimit: 32
    },
    {
        name: 'New England Robotics Derby',
        date: Date.parse('October 12, 2024'),
        location: 'Billerica Memorial High School, 32 River Street, Billerica, MA',

        // slug cannot be "new" because we use that as the route for a new event
        eventSlug: 'nerd24', // often the same as eventCode but can be entered before the eventCode is assgined
        program: 'FRC',
        message: `Hello Teams!    
We are looking forward to hosting the 3rd annual NERD!    
Be sure to pay by the deadline as we have teams on the waitlist!`,
        contactEmail: 'blake@team4909.org',
        eventWebsite: 'https://www.newenglandroboticsderby.com/',
        teamLimit: 32
    }
];

export const getEvents = () => {
    return events;
}

export const getEventBySlug = async (slug: string) => {
    return events.find(event => event.eventSlug === slug);
}

export const getTeamsByEventSlug = async (slug: string) => {
    if (slug === 'nerd24') {
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
                location: 'Bolton, MA',
                status: "Secured"
            }
        ];
    }

    return [];
}

export const getUpcommingEvents = (numEvents: number) => {
    return events.filter(event => event.date > Date.now());
}

export const getPastEvents = (numEvents: number) => {
    return events.filter(event => event.date <= Date.now());
}