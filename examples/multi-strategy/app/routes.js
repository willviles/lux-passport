export default function routes() {
  this.resource('users', {
    only: ['index', 'show']
  }, function() {
    this.post('/login', 'login');
  });

  this.resource('data', {
    only: ['index']
  });
}
