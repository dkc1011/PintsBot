const request = require('request-promise');
var SlackBot = require('slackbots');

const hook = 'TTB5LAL8M/BTDBCNJCX/1bqaK4Kvz1TCPsEcvWk0Ii98';
const hook2 = 'TTB5LAL8M/BT00ECMS6/E3v2VpvwbCFKGecjDK1zTpB6';

const getData = async function()
{
    const json = await request( { 
        url: 'https://next.json-generator.com/api/json/get/Eys6SRn-_',
        json: true
    });
    return json.map(person => ({
        age: person.age,
        email: person.email,
        firstName: person.name.first,
        lastName: person.name.last

    }))
};

(async function () {
    try{
        const people = await getData();
        
        const slackBody = {
            mkdwn: true,
            test: `Pints, Pints!, PINTS!`,
            attachments: people.map(person => ({
                color: 'good',
                text: `*${person.firstName} ${person.lastName}* is looking to go for pints. Contact them at ${person.email}`,
            }))
        };

        //slackpost

        const res = await request({
            url: `https://hooks.slack.com/services/${hook2}`,
            method: 'POST',
            body: slackBody,
            json : true
        });

    //     console.log(res);

    // } catch(e)
    // {
    //     console.log('error', e);
    // }

    debugger;
})();