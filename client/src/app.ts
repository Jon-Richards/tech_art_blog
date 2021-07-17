import './stylesheets/app.scss';
import {Panel} from './components/panel';
import {Heading} from './components/heading';
import {Table} from './components/table';
import {Card} from './components/card';

customElements.define('jr-panel', Panel);
customElements.define('jr-heading', Heading);
customElements.define('jr-table', Table);
customElements.define('jr-card', Card);
