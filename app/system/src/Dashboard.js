import React from 'react';
import { Segment, Icon, Header, Card, Image, Button, Grid } from 'semantic-ui-react';

function Dashboard() {
    const items = [
        {
            header: 'Project Report - April',
            description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
            meta: 'ROI: 30%',
            color: 'blue',
        },
        {
            header: 'Project Report - May',
            description: 'Bring to the table win-win survival strategies to ensure proactive domination.',
            meta: 'ROI: 34%',
            color: 'green',
        },
        {
            header: 'Project Report - June',
            description:
                'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
            meta: 'ROI: 27%',
            color: 'red',
        },
    ]
    return (
        <Segment>
            <Header as='h4' attached='top' block>
                <Icon name='dashboard' />
                Dashboard
            </Header>
            <Segment attached size="mini">
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h5' dividing>
                                <Icon name='medkit' />
                                Custom
                            </Header>
                            <Card.Group itemsPerRow={2} centered>
                                <Card>
                                    <Card.Content>
                                        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                                        <Card.Header>Steve Sanders</Card.Header>
                                        <Card.Meta>Friends of Elliot</Card.Meta>
                                        <Card.Description>
                                            Steve wants to add you to the group <strong>best friends</strong>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green'>
                                                Approve
          </Button>
                                            <Button basic color='red'>
                                                Decline
          </Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                                <Card>
                                    <Card.Content>
                                        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                                        <Card.Header>Molly Thomas</Card.Header>
                                        <Card.Meta>New User</Card.Meta>
                                        <Card.Description>
                                            Molly wants to add you to the group <strong>musicians</strong>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green'>
                                                Approve
          </Button>
                                            <Button basic color='red'>
                                                Decline
          </Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                                <Card>
                                    <Card.Content>
                                        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
                                        <Card.Header>Jenny Lawrence</Card.Header>
                                        <Card.Meta>New User</Card.Meta>
                                        <Card.Description>Jenny requested permission to view your contact details</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green'>
                                                Approve
          </Button>
                                            <Button basic color='red'>
                                                Decline
          </Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                                <Card>
                                    <Card.Content>
                                        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
                                        <Card.Header>Jenny Lawrence</Card.Header>
                                        <Card.Meta>New User</Card.Meta>
                                        <Card.Description>Jenny requested permission to view your contact details</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green'>
                                                Approve
          </Button>
                                            <Button basic color='red'>
                                                Decline
          </Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h5' dividing>
                                <Icon name='book' />
                                Pengumuman
                            </Header>
                            <Card.Group itemsPerRow={2} centered items={items} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
            </Segment>
        </Segment>
    );
}

export default Dashboard;
