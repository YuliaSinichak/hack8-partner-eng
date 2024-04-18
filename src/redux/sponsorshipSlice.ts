import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { iSellingPoint } from '@/types';

const sellingPoints: iSellingPoint[] = [
    {
        compulsory: true,
        active: true,
        name: 'Basic',
        price: 300,
        annotation: 'This offer is necessary!',
        services: [
            `Company logo on the brand wall and on the project website`,
            `Promotion in social networks (company information).`,
            `Logo and mention of your company in the post-project video.`,
            `Participation in networking`
        ]
    },
    {
        compulsory: false,
        active: false,
        name: 'Preceptor',
        price: 700,
        annotation: "1 left",
        services: [
            'The possibility of involving a mentor and/or a judge.',
            `Possibility to conduct a workshop or training among participants`,
            `Logo on T-shirts of all participants and organisers`,
            `Post about the company on Instagram.`,
        ]
    },
    {
        compulsory: false,
        active: false,
        name: 'AdVantage',
        price: 300,
        annotation: '4 left',
        services: [
            `World cafe`,
            `Interactive Instagram stories`,
            `Logo on posters`,
            `«Treasure hunt» game`,
        ]
    },
    {
        compulsory: false,
        active: false,
        name: 'LEGO',
        price: 500,
        annotation: 'You can choose any 4 options from 9',
        services: [
            `World cafe`,
            `«Treasure hunt» game`,
            `The possibility of involving a mentor and/or a judge.`,
            `Post about the company on Instagram.`,
            `Sending out job vacancies via a Telegram bot`,
            `Placement of the company banner during the Hackathon`,
            `Access to the CV database of participants`,
            `Nomination from the company`,
            `Participation in the creative mystery «Define solution»`
        ]
    },
]

// Initialize chosenSponsorships with compulsory items
const initialState = sellingPoints

const sponsorshipSlice = createSlice({
    name: 'sponsorship',
    initialState,
    reducers: {
        toggleSponsorship: (state, action: PayloadAction<{ name: string }>) => {
            const { name } = action.payload;
            const sponsorship = state.find(sp => sp.name === name);

            if (sponsorship && !sponsorship.compulsory) {
                sponsorship.active = !sponsorship.active;
            }
        },
    },
});

export const { toggleSponsorship } = sponsorshipSlice.actions;

export default sponsorshipSlice.reducer;
