const selectImage = (name)=>{
    switch (name) {
        case "Animals":
            return require('../assets/icons/pet.png')
        case "Food":
            return require('../assets/icons/chef.png')
        case "Art":
            return require('../assets/icons/art.png')
        case "Film":
            return require('../assets/icons/video.png')
        case "Music":
            return require('../assets/icons/headphones.png')
        // case "Gaming":
        //     return require('../assets/icons/gaming.png')
        // case "Reading":
        //     return require('../assets/icons/reading.png')
        // case "Running":
        //     return require('../assets/icons/running.png')
        // case "Sports":
        //     return require('../assets/icons/sports.png')
        // case "Studying":
        //     return require('../assets/icons/studying.png')
        // case "Camping":
        //     return require('../assets/icons/camping.png')
        // case "Watching":
        //     return require('../assets/icons/watching.png')

        default:
            break;
    }
}


export default selectImage