/**
 * Created by Howerton on 3/31/2016.
 */

/**
 * Creates a new solution object using solute/solvent formulas, final volume, and goal concentration.
 *
 * @param solute String chemical formula of the solute.
 * @param solvent String chemical formula of the solvent.
 * @param volume Volume of the final solution in liters.
 * @param solution_concentration Goal solution concentration as Molarity.
 *
 * @returns {{}} Solution object (self).
 * @constructor
 */
function Solution(solute, solvent, volume, solution_concentration){
    var self = {};

    //new dictionary holding "single" solution properties.
    self.single = {};

    //new dictionary holding single solution properties for solutions
    // created from a calculated solute mass where the solute is a solid
    self.single.sol = {};

    self.single.sol.solution_calculator = new SingleSolution(
        solution_concentration,
        volume,
        string_to_compound(solute).molecular_weight());

    //new dictionary holding single solution properties for solutions
    //created from a calculated volume of a pure liquid solute
    self.single.volumetric = {};

    self.single.volumetric.solution_calculator = new SingleSolution(
        solution_concentration,
        volume,
        string_to_compound(solute).molecular_weight());



    //new dictionary holding single solution properties for solutions
    //created from a calculated solute mass where the solute is a pure liquid
    self.single.gravimetric = {};



    /* Fields required for all solutions */
    self.solute = string_to_compound(solute);
    self.solvent = string_to_compound(solvent);
    self.volume = volume;
    self.solution_concentration = solution_concentration;
    /*----------------------------------------------------*/



    /**
     * Returns an inner html block listing the steps required to create this specific solution.
     * @returns {string} List of steps to create the solution.
     */
    self.single.sol.steps_html = function(){
        var desc = "<br />Steps to produce " + self.single.sol.description() + "<br /><br />" +
                "1) Pick a container that can safely contain "+ self.volume +"L<br />" +
                "2) Calculate amount of solute necessary("+ self.single.sol.solution_calculator.solid()+"g) using: <br /> " +
                "\u00A0\u00A0\u00A0\u00A0a. goal concentration: "+ self.solution_concentration + "M<br />" +
                "\u00A0\u00A0\u00A0\u00A0b. chosen volume: "+ self.volume + "L<br />" +
                "\u00A0\u00A0\u00A0\u00A0c. solute's molecular weight: "+self.solute.molecular_weight() +"g<br />" +
                "4) Carefully measure out " + self.single.sol.solution_calculator.solid() + "g of " + solute + "<br /> " +
                "5) Using standard methods, transfer the solute to your flask.<br /> " +
                "6) Add solvent (" + solvent + ") to your solution until you reach " + self.volume + "<br /> ";

        return desc;
    };

    self.single.volumetric.steps_html = function(density){
        var desc = "<br />Steps to produce " + self.single.volumetric.description(density) + "<br /><br />" +
            "1) Pick a container that can safely contain "+ self.volume +"L<br />" +
            "2) Calculate amount of solute necessary("+ self.single.volumetric.solution_calculator.liquid.volume(density)+"mL) using: <br /> " +
            "\u00A0\u00A0\u00A0\u00A0a. goal concentration: "+ self.solution_concentration + "M<br />" +
            "\u00A0\u00A0\u00A0\u00A0b. chosen volume: "+ self.volume + "L<br />" +
            "\u00A0\u00A0\u00A0\u00A0c. solute's molecular weight: "+self.solute.molecular_weight() +"g<br />" +
            "\u00A0\u00A0\u00A0\u00A0c. solute's density: "+density +"g/mL<br />" +
            "4) Carefully measure out " + self.single.volumetric.solution_calculator.liquid.volume(density)+"mL of " + solute + "<br /> " +
            "5) Using standard methods, transfer the solute to your flask.<br /> " +
            "6) Add solvent (" + solvent + ") to your solution until you reach " + self.volume + "<br /> ";

        return desc;
    };

    self.single.gravimetric.steps_html = function(){
        var desc = "<br />Steps to produce " + self.single.gravimetric.description() + "<br /><br />" +
            "1) Pick a container that can safely contain "+ self.volume +"L<br />" +
            "2) Calculate amount of solute necessary("+ self.single.sol.solution_calculator.solid()+"g) using: <br /> " +
            "\u00A0\u00A0\u00A0\u00A0a. goal concentration: "+ self.solution_concentration + "M<br />" +
            "\u00A0\u00A0\u00A0\u00A0b. chosen volume: "+ self.volume + "L<br />" +
            "\u00A0\u00A0\u00A0\u00A0c. solute's molecular weight: "+self.solute.molecular_weight() +"g<br />" +
            "4) Carefully measure out " + self.single.sol.solution_calculator.solid() + "g of " + solute + "<br /> " +
            "5) Using standard methods, transfer the solute to your flask.<br /> " +
            "6) Add solvent (" + solvent + ") to your solution until you reach " + self.volume + "<br /> ";

        return desc;
    };

    //TODO: add steps functions for the other solution variants

    /**
     * Gets a short, one-line description of the solution.
     * @returns {string} Description of the solution.
     */
    self.single.gravimetric.description = function(){
        var description = self.solute.molecular_weight() + "g " + solute + " in " + self.volume + "L of "
          + solvent + " where Molarity = " + self.solution_concentration;
        return description;
    };

    /**
     * Gets a short, one-line description of the solution.
     * @returns {string} Description of the solution.
     */
    self.single.sol.description = function(){
        var description = self.solute.molecular_weight() + "g " + solute + " in " + self.volume + "L of "
          + solvent + " where Molarity = " + self.solution_concentration;
        return description;
    };

    /**
     * Gets a short, one-line description of the solution.
     * @returns {string} Description of the solution.
     */
    self.single.volumetric.description = function(density){
        var description =  self.single.volumetric.solution_calculator.liquid.volume(density)+ "mL " + solute + " in " + self.volume + "L of "
          + solvent + " where Molarity = " + self.solution_concentration+"mol/L";
        return description;
    };

    // self.generic_steps = function(){
    //     var desc = "<br />Steps to produce " + self.description() + "<br />" +
    //         "1) Choose a final volume and container for your solution. <br />" +
    //         "2) Choose a goal concentration for your solution. <br />" +
    //         "3) Calculate amount of solute necessary (g) using <br /> " +
    //         "   concentration, volume, and the solute's molecular weight <br />" +
    //         "4) Carefully measure out <br /> ";
    // };


    return self;

}