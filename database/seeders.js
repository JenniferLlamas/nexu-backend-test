const menu = require('options-menu');
var fs = require('fs')

/*
 * Funciones para random data
 */
module.exports = async function () {
    
    fs.readdir('./database/seeders', function (err, seeders) {
        const callback = (Seeder) => async  () => {
            await Seeder()
            console.log('\n\n\n\n')
            console.log('***************************************************')
            console.log('\t\t Menu ')
            console.log('***************************************************')
            menu.single("NEXU", options, callback)
        }
        const options = []

        for (let index = 0; index < seeders.length; index++) {
            const seeder = seeders[index];
            const seederContent = require('./seeders/' + seeder.replace('.js', ''))
            options.push({
                title: seeder + '  --  ' + (seederContent.title ? seederContent.title:'') +  (seederContent.description ?('\n' + seederContent.description):'') + '\n',
                action: callback(seederContent.seeder)
            })
        }
        
        options.push({
            title: " ----- FINISH PROGRAM ----- ",
            action: () => process.exit(1)
        })

        console.log('\t\t')
        menu.single("NEXU", options, callback);
        console.log('\t\t')
    })
}