const DriverGameModule = (() => {

    const drivers = [
        {
            name: "Max Verstappen",
            image: "max.jpg",
            correct: false
        },
        {
            name: "Lewis Hamilton",
            image: "hamilton.jpg",
            correct: false
        },
        {
            name: "Alexander Albon",
            image: "albon.jpg",
            correct: false
        },
        {
            name: "Fernando Alonso",
            image: "alonso.jpg",
            correct: false
        },
        {
            name: "Valtteri Bottas",
            image: "bottas.jpg",
            correct: false
        },
        {
            name: "Carlos Sainz",
            image: "carlos.jpg",
            correct: false
        },
        {
            name: "Charles Leclerc",
            image: "charles.jpg",
            correct: false
        },
        {
            name: "Esteban Ocon",
            image: "esteban.jpg",
            correct: false
        },
        {
            name: "Pierre Gasly",
            image: "gasly.jpg",
            correct: false
        },
        {
            name: "Lance Stroll",
            image: "lance.jpg",
            correct: false
        },
        {
            name: "Lando Norris",
            image: "lando.jpg",
            correct: false
        },
        {
            name: "Sergio Perez",
            image: "perez.jpg",
            correct: false
        },
        {
            name: "George Russell",
            image: "russell.jpg",
            correct: false
        },
        {
            name: "Yuki Tsunoda",
            image: "yuki.jpg",
            correct: false
        },        
    ]

    const getAll = () => structuredClone(drivers)

    return {
        getAll,
    };


})();

export default DriverGameModule;
