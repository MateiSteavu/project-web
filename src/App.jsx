import Card from './Card';

const projects = [
  { title: "Proiect 1", description: "Pagina personala" },
  { title: "Proiect 2", description: "Calculator buget" },
  { title: "Proiect 3", description: "Dashboard React" },
  { title: "Proiect 4", description: "Cea mai de buget chestie de pe aici, ca daca tot avem calculator buget..." },
  { title: "Proiect 5", description: "Nu vreau sa scriu lorem, deci nu scriu lorem." },
];
// In JSX-ul returnat de App:

function App() {
    return (
        <div>
        <h1>Dashboard</h1>
        {/* <Card title="Proiect 1" description="Pagina personala cu HTML si CSS" cartof="Alt test doar asa"/>
        <Card title="Proiect 2" description="Pagina interactiva cu JavaScript" cartof="Alt test doar asa"/>
        <Card title="Proiect 3" description="Dashboard cu React" cartof="Alt test doar asa"/> */}

        {projects.map(function(item, index) {
          return <Card key={index} title={item.title} description={item.description} />;
        })}
        </div>
    );
}

export default App;