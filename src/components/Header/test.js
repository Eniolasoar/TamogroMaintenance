const getInitials=(name)=>{
    const nameSplit=name.split(' ');
    const firstInitial=nameSplit[0][0];
    const secondInitial=nameSplit[1][0];
    const initials=firstInitial + secondInitial;
    return initials;
  }

const initials=getInitials('Femi Anishe');
console.log(initials);