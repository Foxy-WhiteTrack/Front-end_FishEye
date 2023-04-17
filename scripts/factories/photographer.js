function photographerFactory(data) {
    const { id, name, portrait, tag, city, country, price } = data;

    const picture = `assets/images/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        let href = './photographer.html?id=' + id;

        article.innerHTML =
            `<a href="${href}" aria-label="${name}">
            <img src="${picture}" alt="Photo du profil de ${name}">
            <h2>${name}</h2>
        </a>
        <div aria-label="Informations concernant le photographe">
            <p>${city}, ${country}</p>
            <p>${tag}</p>
            <p aria-label="${price} € par jour">${price} € par jour</p>
        </div>`;

        return (article);
    }
    return { getUserCardDOM }
}