import Array "mo:core/Array";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Mix in authorization system — YOU MUST NOT COMMENT THIS OUT, without it nothing works
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Management
  type ProductId = Text;

  public type Category = {
    #fashion;
    #jewelry;
    #luxury;
  };

  public type Product = {
    id : ProductId;
    name : Text;
    brand : ?Text;
    category : Category;
    shortDescription : Text;
    imageUrl : Text;
    affiliateUrl : Text;
    price : ?Float;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.id, product2.id);
    };
  };

  let productStore = Map.empty<ProductId, Product>();

  // Public read access - anyone can view products (including guests)
  public query func getProduct(id : ProductId) : async Product {
    switch (productStore.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  // Public read access - anyone can list products (including guests)
  public query func listProducts() : async [Product] {
    productStore.values().toArray().sort();
  };

  // Admin-only write access
  public shared ({ caller }) func createProduct(product : Product) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    if (productStore.containsKey(product.id)) {
      Runtime.trap("Product already exists");
    };
    productStore.add(product.id, product);
  };

  // Admin-only write access
  public shared ({ caller }) func updateProduct(id : ProductId, updatedProduct : Product) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (productStore.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_existing) {
        productStore.add(id, updatedProduct);
      };
    };
  };

  // Admin-only write access
  public shared ({ caller }) func deleteProduct(id : ProductId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    switch (productStore.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_product) {
        productStore.remove(id);
      };
    };
  };
};
