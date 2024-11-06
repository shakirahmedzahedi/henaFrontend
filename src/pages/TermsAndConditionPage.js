import React from 'react';
import {
  Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TermsAndConditionPage() {
    return (
        <Box sx={{ ml: { sm: 3, md: 15, lg: 19, xl: 23 }, mr: { sm: 3, md: 15, lg: 19, xl: 23 },  mb:{xs:10,sm:20, md:15,lg:5,xl:5},  mt:{xs:10,sm:20, md:15,lg:5,xl:5}}}>

            <Typography variant="h4" align="center" gutterBottom>
                Terms and Conditions
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" paragraph>
                Last updated: [Date]
            </Typography>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">1. Introduction</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1">
                        1.1. These Terms and Conditions apply to your use of [Your Store URL] ("Website") 
                        and your purchase of products from [Your Store Name] ("we", "our", "us").
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        1.2. By accessing our Website and placing an order, you agree to these Terms. If you do not agree, 
                        please refrain from using our Website.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">2. Eligibility</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1">
                        2.1. You must be at least 18 years old to make a purchase. By ordering through our Website, you 
                        confirm that you are legally capable of entering into a binding contract.
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        2.2. We reserve the right to refuse service, terminate accounts, and cancel orders at our sole discretion.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">3. Account Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1">
                        3.1. You are responsible for maintaining the confidentiality of your account and password and for 
                        restricting access to your account.
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        3.2. All information you provide to us should be accurate and current. You must notify us of any changes 
                        to your personal information.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* Repeat similar Accordion sections for other points (4-13) */}

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">13. Contact Us</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1">
                        If you have questions about these Terms and Conditions, please contact us at:
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="body2">
                            - Email: [Your Contact Email]
                        </Typography>
                        <Typography variant="body2">
                            - Phone: [Your Contact Number]
                        </Typography>
                        <Typography variant="body2">
                            - Address: [Your Physical Address]
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
