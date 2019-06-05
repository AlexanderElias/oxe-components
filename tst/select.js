import Select from './lib/o-select.js';

const Scope = {
    name: 'o-scope',
    model: {
        colorResult: '',
        plantResult: [],
        plants: {
            flowers: [
                { name: 'rose' },
                { name: 'tulip' }
            ],
            trees: [
                { name: 'oak' },
                { name: 'aspen' }
            ]
        }
    },
    template: /*html*/`

        <br>
    	<hr>
    	<div o-text="colorResult"></div>
    	<br>
    	<o-select o-value="colorResult">
			<o-option value="blue">Blue</o-option>
			<o-option value="red">Red</o-option>
    	</o-select>

    	<br>
    	<hr>
    	<div o-text="plantResult"></div>
    	<br>
    	<o-select o-value="plantResult" o-each-plant="plants" multiple>
    		<o-optgroup o-label="$plant.$key" o-each-p="$plant">
    			<o-option o-value="$p">
    				<div>{{$p.name}}</div>
    				<div o-text="$p.name"></div>
    			</o-option>
    		</o-optgroup>
    	</o-select>

    `,
};

Oxe.setup({
	component: {
		components: [
			Select,
            Scope
		]
	}
}).catch(console.error);

// model: {
//     title: title,
//     stateOne: 'AZ',
//     stateTwo: 'FL',
//     cars: [
//         'Audi',
//         'Saab',
//         'Volvo'
//     ],
//     names: [
//         'jon',
//         'alex',
//         'dave'
//     ],
//     groups: [
//         'one',
//         'two'
//     ],
//     friends: [
//         { name: 'dave', age: 2 },
//         { name: 'sam', age: 40 }
//     ],
//     plants: {
//         flowers: [
//             { name: 'rose' },
//             { name: 'tulip' }
//         ],
//         trees: [
//             { name: 'oak' },
//             { name: 'aspen' }
//         ]
//     },
//     result: {
//         state: 'FL',
//         fruit: '',
//         name: '',
//         cars: [],
//         friends: [],
//         plants: []
//     }
// }
