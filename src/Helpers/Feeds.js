class IncludeFeeds {
  getPostsByFeatured() {
    return fetch('http://diariotiempo.mx/wp-json/wp/v2/posts?tag=910&per_page=4');
  }
  getPosts(pageNumber) {
    return fetch('http://diariotiempo.mx/wp-json/wp/v2/posts?per_page=5&page=' + parseInt(pageNumber));
  }
  getPostsByCategory(categoryId, pageNumber) {
    return fetch('http://diariotiempo.mx/wp-json/wp/v2/posts?categories=' + parseInt(categoryId) + '&page=' + parseInt(pageNumber));
  }
  getCategories() {
    return fetch('http://diariotiempo.mx/wp-json/wp/v2/categories?per_page=20');
  }
}
export default new IncludeFeeds();
