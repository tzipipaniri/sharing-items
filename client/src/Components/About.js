import React from 'react'
import Navbar from './Navbar'
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material'

function About() {
    return (
        <div>
            <Navbar />
            <Typography variant="h3" style={{ lineHeight: '1.6', letterSpacing: '0.01em' }}>
                About
            </Typography>
            <Container>
                <Typography variant="body1" style={{ lineHeight: '1.6', letterSpacing: '0.01em' }}>
                    In 2003, my friend and I participated in an international seminar in Italy, called "Create your destiny", and was organized by Informa. In this seminar I deeply understood that I can direct my life and fulfill my dreams. With the tools and inspiration we received at the seminar, we started to set up an internet venture.
                    Although the project was not successful, it left me with a taste for more. Half a year later, I worked in a fashion warehouse where quantities of plastic hangers were thrown every day.
                    I felt that it was a tremendous waste, and that there are certainly thousands more such cases. I started to think about how it would be possible to connect those people who don't need the objects with those who would, and then the light bulb turned on:
                    "You can do it online..."

                    Tzur Taub - the marketing manager and founder of the site
                </Typography>
            </Container>
            <Container>
                <Typography variant="body1" style={{ lineHeight: '1.6', letterSpacing: '0.01em' }}>
                    I took my first steps in the second hand world on the Freecycle forum. In February 2006, I happened to come across a short article about Freecycle in the computer section of Yedioth Ahronoth, I entered the website and immediately fell in love with the idea. I decided to open my own forum for the city of Ashkelon, as part of the global Freecycle network.
                    One day, I came across an ad on the Tel Aviv forum with a link to the 'Agora' website. I entered it, and was very excited that we have such an Israeli initiative.
                    After browsing the site I came across a book delivery ad posted by Tzur, I contacted him and we arranged a collection. At his house we talked a bit about how I got to the site and what I think about the project and the spirit in general. That evening I received an email from him, saying that maybe it was a coincidence, but he was just looking for a partner for the project.
                    "I don't believe in coincidence," I replied.

                    Yaron Ben-Ami - partner and software manager
                </Typography>
            </Container>
            <Container>
                <Typography variant="h6" style={{ lineHeight: '1.6', letterSpacing: '0.01em' }}>
                    Our volunteers
                </Typography>
                <Typography variant="body1" style={{ lineHeight: '1.6', letterSpacing: '0.01em' }}>
                    Good people who help maintain the quality of the project's ongoing activities. Thank you for your help, your time and your good will:
                </Typography>
                <Container sx={{ listStylePosition: 'inside', textAlign: 'center' }}>
                    <ul>
                        <li> Norit Rosenbaum</li>
                        <li>Woodpecker thresholds </li>
                    </ul>
                </Container>
            </Container>
    </div>
    )
}

export default About