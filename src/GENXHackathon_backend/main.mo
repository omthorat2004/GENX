import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Result "mo:base/Result";
import Text "mo:base/Text";

actor {

  type Owner = {
    shopName: Text;
    email: Text;
    password: Text;
  };

  type User = {
    userName: Text;
    email: Text;
    password: Text;
  };

  type Bill = {
    id: Nat;
    photoUrl: Text;
    ownerEmail: Text;
    userEmail: Text;
    approved: Bool;
  };

  stable var owners: [Owner] = [];
  stable var users: [User] = [];
  stable var bills: [Bill] = [];
  stable var nextBillId: Nat = 1;

  public func registerOwner(shopName: Text, email: Text, password: Text): async Result.Result<Text, Text> {
    if (email == "" or not containsAtSymbol(email)) {
      return #err("Invalid email format");
    };

    if (password.size() < 8) {
      return #err("Password must be at least 8 characters long");
    };

    if (Array.find<Owner>(owners, func(owner: Owner) : Bool { owner.email == email }) != null) {
      return #err("Owner with this email already registered");
    };

    let newOwner: Owner = { 
      shopName = shopName; 
      email = email; 
      password = password 
    };

    owners := Array.append(owners, [newOwner]);
    return #ok("Shop owner registered successfully");
  };

  public func registerUser(userName: Text, email: Text, password: Text): async Result.Result<Text, Text> {
    if (email == "" or not containsAtSymbol(email)) {
      return #err("Invalid email format");
    };

    if (password.size() < 8) {
      return #err("Password must be at least 8 characters long");
    };

    if (Array.find<User>(users, func(user: User) : Bool { user.email == email }) != null) {
      return #err("User with this email already registered");
    };

    let newUser: User = { 
      userName = userName; 
      email = email; 
      password = password 
    };

    users := Array.append(users, [newUser]);
    return #ok("User registered successfully");
  };

  private func containsAtSymbol(email: Text): Bool {
    for (char in email.chars()) {
      if (char == '@') return true;
    };
    false
  };

  public func login(email: Text, password: Text): async Result.Result<Text, Text> {
    switch (Array.find<Owner>(owners, func(owner: Owner) : Bool { owner.email == email })) {
      case (?owner) {
        if (owner.password == password) {
          return #ok("Owner");
        } else {
          return #err("Invalid password for owner");
        }
      };
      case (_) { };
    };

    switch (Array.find<User>(users, func(user: User) : Bool { user.email == email })) {
      case (?user) {
        if (user.password == password) {
          return #ok("User");
        } else {
          return #err("Invalid password for user");
        }
      };
      case (_) { };
    };

    return #err("Email not found");
  };

  public func uploadBill(photoUrl: Text, ownerEmail: Text, userEmail: Text): async Result.Result<Text, Text> {
    let newBill: Bill = {
      id = nextBillId;
      photoUrl = photoUrl;
      ownerEmail = ownerEmail;
      userEmail = userEmail;
      approved = false;
    };

    bills := Array.append(bills, [newBill]);
    nextBillId := nextBillId + 1;
    return #ok("Bill uploaded successfully");
  };

 public func getBillsByUser(userEmail: Text, approved: Bool): async [Bill] {
  let filteredBills = Array.filter(bills, func (bill: Bill) : Bool {
    return bill.userEmail == userEmail and bill.approved == approved;
  });

  let billsWithShopName = Array.map(filteredBills, func (bill: Bill) : Bill {
    let ownerOpt = Array.find<Owner>(owners, func(owner: Owner) : Bool { 
      owner.email == bill.ownerEmail 
    });
    
    switch (ownerOpt) {
      case (?ownerData) {
        return  {
          id = bill.id;
          photoUrl = bill.photoUrl;
          ownerEmail = bill.ownerEmail;
          userEmail = bill.userEmail;
          approved = bill.approved;
          shopName = ownerData.shopName;
        };
      };
      case (_) {
        return bill; 
      };
    }
  });

  return billsWithShopName;
};




  public func getUnapprovedBillsByOwner(ownerEmail: Text): async [Bill] {
    let filteredBills = Array.filter(bills, func (bill:Bill) : Bool {
      return bill.ownerEmail == ownerEmail and bill.approved == false;
    });
    return filteredBills;
  };

  public func getApprovedBillsByOwner(ownerEmail: Text): async [Bill] {
    let filteredBills = Array.filter(bills, func (bill:Bill) : Bool {
      return bill.ownerEmail == ownerEmail and bill.approved == true;
    });
    return filteredBills;
  };

  public func approveBill(id: Nat): async Result.Result<Text, Text> {
    switch (Array.find<Bill>(bills, func(bill: Bill) : Bool { bill.id == id })) {
      case (?bill) {
        let updatedBill: Bill = {
          id = bill.id;
          photoUrl = bill.photoUrl;
          ownerEmail = bill.ownerEmail;
          userEmail = bill.userEmail;
          approved = true;
        };

        bills := Array.map(bills, func(bill: Bill) : Bill {
          if (bill.id == id) {
            updatedBill
          } else {
            bill
          }
        });
        return #ok("Bill approved successfully!");
      };
      case (_) {
        return #err("Bill with this ID not found");
      };
    };
  };

  public func deleteBill(id: Nat): async Result.Result<Text, Text> {
    switch (Array.find<Bill>(bills, func(bill: Bill) : Bool { bill.id == id })) {
      case (?_) {
        bills := Array.filter(bills, func(bill: Bill) : Bool {
          return bill.id != id;
        });
        return #ok("Bill deleted successfully!");
      };
      case (_) {
        return #err("Bill with this ID not found");
      };
    };
  };
};
