// SLIDE OUT MENU
document.addEventListener('DOMContentLoaded', function() {
    var elem = document.querySelector('.sidenav');
     M.Sidenav.init(elem, {});
    var instance = M.Sidenav.getInstance(elem);
    document.querySelector('#profile').addEventListener('click', function(){
        instance.open()
    })
  });

  const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#item-name').value.trim();
    const category = document.querySelector('#category').value.trim();
    const purchase_date = document.querySelector('#purchase_date').value.trim();
    const purchased_from = document.querySelector('#purchased_from').value.trim();
    const purchase_price = document.querySelector('#purchase_price').value.trim();
    const item_value = document.querySelector('#item_value').value.trim();
    
  
    if (name && category && purchase_date && purchased_from && purchase_price && item_value) {
      const response = await fetch(`/api/items`, {
        method: 'POST',
        body: JSON.stringify({ name, purchase_date, purchase_price, item_value, category }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create item');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-item-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.item-list')
    .addEventListener('click', delButtonHandler);  

    const signOut = async () => {
        const response = await fetch('/api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert(response.statusText);
        }
      };
      
      document.querySelector('.signOut').addEventListener('click', logout);
      