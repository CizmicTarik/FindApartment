import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      eng: {
        translation: {
          welcome: "Welcome!",
          description:
            "Sell, buy and/or rent apartments really fast and simply!",
          button1: "Apartments",
          button2: "Register",
          button3: "Login",
          button4: "Profile",
          button5: "Logout",
          button6: "Add",
          button7: "Seller Details",
          button8: "Close",
          button9: "Upload a photo",
          button10: "Add",
          button11: "Update",
          button12: "Active",
          button13: "Sold",
          button14: "Rented",
          button15: "Submit",
          yesButton: "Yes",
          noButton: "No",
          defaultStatus: "New",
          setAs: "Set as:",
          registerText: "Register",
          firstName: "First Name",
          lastName: "Last Name",
          password: "Password",
          confirmPassword: "Confirm Password",
          phoneNumber: "Phone number",
          haveAccountLogin: "Have an account? Log in!",
          validFirstName: "Please enter a valid first name! (Can't be empty.)",
          validLastName: "Please enter a valid last name! (Can't be empty.)",
          validEmail:
            'Please enter a valid email! (Can\'t be empty, needs to contain "@" and ".")',
          validPassword:
            "Please enter a valid password! (Can't be empty, needs to contain at least 6 characters.)",
          validConfirmedPassword:
            "Please enter a valid confirmed password! (Match password field.)",
          validPhoneNumber:
            "Please enter a valid phone number! (Needs at least 9 characters.)",
          validTitle: "Please enter a title! (Can't be empty.)",
          validDescription: "Please enter a description! (Can't be empty.)",
          validLocation: "Please enter a location! (Can't be empty.)",
          validPrice: "Please enter a price! (Can't be empty.)",
          validSqm: "Please enter square meters! (Can't be empty.)",
          validType: "Please select a type!",
          type1: "Sell",
          type2: "Rent",
          loading: "Loading...",
          registerSnackbar: "Registered successfully!",
          emailInUse:
            "Email is already in use. Try to register with another email.",
          loginText: "Login",
          noAccountRegister: "No account? Register!",
          loginSnackbar: "Logged in successfully!",
          noUserFound: "Email and/or password not correct. Please try again!",
          enterLocation: "Enter wanted location",
          priceRange: "Price Range",
          from:"From",
          to:"To",
          description2: "Description",
          price: "Price(KM): ",
          m2: "sm2: ",
          typeCard: "Type: ",
          title: "Title",
          location: "Location",
          type: "Select a Type",
          noChange: "Once you upload a photo you can't change it later!",
          addApartment: "Add apartment",
          chooseAPhoto: "Please choose a photo first!",
          snackbarAdd: "Apartment added!",
          statusType: "New",
          cantLoadData: "Something is wrong! Can't load data.",
          noApartments: "There are no apartments currently.",
          updateApartment: "Update apartment",
          cantUpload: "The photo can't be uploaded, try again!",
          deleteText: "Are you sure you want to delete the apartment?",
          apartmentDeleted: "Apartment deleted successfully!",
          cantDeleteData: "Can't delete apartment",
        },
      },
      bos: {
        translation: {
          welcome: "Dobrodo??li!",
          description:
            "Kupite, prodajte i/ili iznajmite apartmane brzo i jednostavno!",
          button1: "Apartmani",
          button2: "Registracija",
          button3: "Prijava",
          button4: "Profil",
          button5: "Odjava",
          button6: "Dodaj",
          button7: "Informacije o vlasniku",
          button8: "Zatvori",
          button9: "Dodajte fotografiju",
          button10: "Dodajte",
          button11: "A??urirajte",
          button12: "Aktivan",
          button13: "Prodan",
          button14: "Iznajmljen",
          yesButton: "Da",
          noButton: "Ne",
          defaultStatus: "Nov",
          setAs: "Postavi kao: ",
          registerText: "Registracija",
          firstName: "Ime",
          lastName: "Prezime",
          password: "??ifra",
          confirmPassword: "Potvrda ??ifre",
          phoneNumber: "Broj mobitela",
          haveAccountLogin: "Imate profil? Prijavite se!",
          validFirstName:
            "Molimo Vas unesite validno ime! (Polje ne mo??e biti prazno.)",
          validLastName:
            "Molimo Vas unesite validno prezime! (Polje ne mo??e biti prazno.)",
          validEmail:
            'Molimo Vas unesite validan email! (Polje ne mo??e biti prazno, mora sadr??avati "@" i ".")',
          validPassword:
            "Molimo Vas unesite validnu ??ifru! (Polje ne mo??e biti prazno, mora sadr??avati najmanje 6 karaktera.)",
          validConfirmedPassword:
            "Molimo Vas unesite validnu potvrdu ??ifre! (Mora biti ista kao ??ifra upisana u polje iznad.)",
          validPhoneNumber:
            "Molimo Vas unesite validan broj mobitela! (Mora sadr??avati najmanje 9 karaktera.)",
          validTitle: "Molimo Vas unesite naziv! (Polje ne mo??e biti prazno.)",
          validDescription:
            "Molimo Vas unesite opis! (Polje ne mo??e biti prazno.)",
          validLocation:
            "Molimo Vas unesite lokaciju! (Polje ne mo??e biti prazno.)",
          validPrice: "Molimo Vas unesite cijenu! (Polje ne mo??e biti prazno.)",
          validSqm:
            "Molimo Vas unesite kvadraturu! (Polje ne mo??e biti prazno.)",
          validType: "Molimo Vas odaberite tip!",
          type1: "Prodaja",
          type2: "Iznajmljivanje",
          loading: "U??itavanje...",
          registerSnackbar: "Registracija uspje??na!",
          emailInUse:
            "Email se ve?? koristi. Poku??ajte se registrovati s drugim emailom.",
          loginText: "Prijava",
          noAccountRegister: "Nemate profil? Registrujte se!",
          loginSnackbar: "Prijava uspje??na!",
          noUserFound:
            "Email i/ili ??ifra nisu ta??ni. Molimo Vas poku??ajte ponovo!",
          enterLocation: "Upi??ite ??eljenu lokaciju",
          priceRange: "Cjenovni rang",
          from:"Od",
          to:"Do",
          description2: "Opis",
          price: "Cijena (KM): ",
          m2: "m2: ",
          typeCard: "Tip: ",
          title: "Naziv",
          location: "Lokacija",
          type: "Odaberite tip",
          noChange: "Poslije ne??ete mo??i promijeniti fotografiju!",
          addApartment: "Dodajte apartman",
          chooseAPhoto: "Molimo Vas da odaberete fotografiju prvo!",
          snackbarAdd: "Apartman uspje??no dodan!",
          statusType: " Novo",
          cantLoadData: "Ne??to nije u redu! Podaci se ne mogu u??itati.",
          noApartments: "Trenutno nema apartmana!",
          updateApartment: "A??urirajte apartman",
          cantUpload: "Fotografija se ne mo??e u??itati, poku??ajte ponovo!",
          deleteText: "Jeste li sigurni da ??elite obrisati apartman?",
          apartmentDeleted: "Apartman uspje??no obrisan!",
          cantDeleteData: "Apartman se ne mo??e obrisati!",
        },
      },
    },
  });

export default i18n;
